package com.teamEleven.backend.controllers;

import com.google.genai.Chat;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.teamEleven.backend.dtos.FlashcardDto;
import com.teamEleven.backend.dtos.FlashcardListRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/llm-chat")
@CrossOrigin(origins = "http://localhost:3000")
public class LLMChatController {

    private final Client client;
    
    // In-memory storage for chat sessions per user
    private final Map<String, Chat> chatSessions = new ConcurrentHashMap<>();
    
    // Model name
    private static final String MODEL_NAME = "gemini-2.5-flash";

    public LLMChatController(Client client) {
        this.client = client;
    }

    /**
     * Regular chat endpoint - returns complete response
     * Maintains conversation history per user
     */
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestParam(required = false, defaultValue = "default") String sessionId,
            @RequestBody String message) {
        try {
            // Get or create chat session for this user
            Chat chatSession = chatSessions.computeIfAbsent(sessionId, 
                    id -> client.chats.create(MODEL_NAME));
            
            // Send message and get response
            GenerateContentResponse response = chatSession.sendMessage(message);
            String responseText = response.text();
            
            Map<String, String> result = Map.of(
                "response", responseText,
                "sessionId", sessionId
            );
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Streaming chat endpoint - streams response as it's generated using Flux
     * Uses Server-Sent Events (SSE) for streaming with reactive programming
     */
    @GetMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamChat(
            @RequestParam(required = false, defaultValue = "default") String sessionId,
            @RequestParam String message) {
        
        return Flux.defer(() -> {
            try {
                // Get or create chat session for this user
                Chat chatSession = chatSessions.computeIfAbsent(sessionId, 
                        id -> client.chats.create(MODEL_NAME));
                
                // Send message and get response
                GenerateContentResponse response = chatSession.sendMessage(message);
                String responseText = response.text();
                
                // Create list of chunks - chunk by words to preserve spacing
                java.util.List<ServerSentEvent<String>> chunks = new java.util.ArrayList<>();
                String[] words = responseText.split("(?<= )", -1); // Split on spaces but keep spaces
                
                // Group words into chunks (approximately 3-5 words per chunk)
                StringBuilder currentChunk = new StringBuilder();
                int wordsPerChunk = 3;
                int wordCount = 0;
                
                for (String word : words) {
                    currentChunk.append(word);
                    wordCount++;
                    
                    if (wordCount >= wordsPerChunk || word.endsWith(".") || word.endsWith("!") || word.endsWith("?")) {
                        if (currentChunk.length() > 0) {
                            chunks.add(ServerSentEvent.<String>builder()
                                    .event("chunk")
                                    .data(currentChunk.toString())
                                    .build());
                            currentChunk.setLength(0);
                            wordCount = 0;
                        }
                    }
                }
                
                // Add any remaining text
                if (currentChunk.length() > 0) {
                    chunks.add(ServerSentEvent.<String>builder()
                            .event("chunk")
                            .data(currentChunk.toString())
                            .build());
                }
                
                // Add completion event
                chunks.add(ServerSentEvent.<String>builder()
                        .event("done")
                        .data("")
                        .build());
                
                // Return Flux that emits chunks with delay
                return Flux.fromIterable(chunks)
                        .delayElements(Duration.ofMillis(50)); // Delay between chunks for smooth streaming
                        
            } catch (Exception e) {
                return Flux.just(ServerSentEvent.<String>builder()
                        .event("error")
                        .data("Error: " + e.getMessage())
                        .build());
            }
        });
    }

    /**
     * Get chat history for a session
     */
    @GetMapping("/chat/history")
    public ResponseEntity<Map<String, Object>> getChatHistory(
            @RequestParam(required = false, defaultValue = "default") String sessionId) {
        Chat chatSession = chatSessions.get(sessionId);
        if (chatSession == null) {
            return ResponseEntity.ok(Map.of(
                "sessionId", sessionId,
                "history", "No chat history found for this session"
            ));
        }
        
        return ResponseEntity.ok(Map.of(
            "sessionId", sessionId,
            "history", chatSession.getHistory(true).toString()
        ));
    }

    /**
     * Initialize chat with flashcards and generate a conversational scenario
     */
    @PostMapping("/chat/init")
    public ResponseEntity<Map<String, String>> initializeChatWithFlashcards(
            @RequestParam(required = false, defaultValue = "default") String sessionId,
            @RequestBody FlashcardListRequest request) {
        try {
            List<FlashcardDto> flashcards = request != null ? request.getFlashcards() : null;
            if (flashcards == null || flashcards.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Flashcards list cannot be empty"));
            }
            
            // Build a prompt that includes the flashcards and asks for a scenario
            StringBuilder promptBuilder = new StringBuilder();
            promptBuilder.append("You are a helpful english only language learning tutor. Based on the following flashcards, create an engaging conversational scenario where the user can practice using these phrases naturally. ");
            promptBuilder.append("The scenario should be in english only, realistic and contextually appropriate. Start the conversation as if you are the other person in the scenario.\n\n");
            promptBuilder.append("Flashcards to practice:\n");
            
            for (FlashcardDto flashcard : flashcards) {
                promptBuilder.append("- ").append(flashcard.getQuestion())
                        .append(" → ").append(flashcard.getAnswer()).append("\n");
            }
            
            promptBuilder.append("\nNow, create a conversational scenario and start the conversation introducing yourself and the category topic. ");
            promptBuilder.append("Make it natural and engaging. You should play the role of the other person in the scenario.");
            
            String initializationPrompt = promptBuilder.toString();
            
            // Create or get chat session
            Chat chatSession = chatSessions.computeIfAbsent(sessionId, 
                    id -> client.chats.create(MODEL_NAME));
            
            // Send initialization prompt and get scenario
            GenerateContentResponse response = chatSession.sendMessage(initializationPrompt);
            String scenario = response.text();
            
            Map<String, String> result = Map.of(
                "scenario", scenario,
                "sessionId", sessionId,
                "message", "Chat initialized with conversational scenario"
            );
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Clear/reset a chat session
     */
    @DeleteMapping("/chat")
    public ResponseEntity<String> clearChatSession(
            @RequestParam(required = false, defaultValue = "default") String sessionId) {
        chatSessions.remove(sessionId);
        return ResponseEntity.ok("Chat session cleared for: " + sessionId);
    }
}

