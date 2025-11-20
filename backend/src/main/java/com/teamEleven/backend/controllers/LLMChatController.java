package com.teamEleven.backend.controllers;


import com.google.common.collect.ImmutableList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.genai.Chat;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentResponse;

@RestController
@RequestMapping("/api/llm-chat")
@CrossOrigin(origins = "http://localhost:3000")
public class LLMChatController {

    @Value("${google.api.key:}")
    private String apiKey;

    private Client client;

    @GetMapping
    public ResponseEntity<String> basicChat() {
        // Check if API key is available from properties or environment
        String googleApiKey = System.getenv("GOOGLE_API_KEY");
        
        // The Client constructor requires GOOGLE_API_KEY environment variable
        // We can't set env vars at runtime, so we need to check before creating the client
        if ((googleApiKey == null || googleApiKey.isEmpty()) && (apiKey == null || apiKey.isEmpty())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "GOOGLE_API_KEY environment variable must be set. " +
                "Set it before starting the application: export GOOGLE_API_KEY=your_api_key"
            );
        }

        try {
            // The Client constructor reads from GOOGLE_API_KEY environment variable
            // If apiKey from properties is set but env var is not, we can't use it
            // because Java doesn't allow setting environment variables at runtime
            Client client = new Client();

            Chat chatSession = client.chats.create("gemini-2.5-flash");
            // test
            GenerateContentResponse response =
                    chatSession.sendMessage("I have 2 dogs in my house.");
            System.out.println("First response: " + response.text());

            response = chatSession.sendMessage("How many paws are in my house?");
            System.out.println("Second response: " + response.text());

            // Get the history of the chat session.
            // Passing 'true' to getHistory() returns the curated history, which excludes
            // empty or invalid parts.
            // Passing 'false' here would return the comprehensive history, including
            // empty or invalid parts.
            ImmutableList<Content> history = chatSession.getHistory(true);
            System.out.println("History: " + history);
            
            return ResponseEntity.ok("Chat completed successfully. Check console for output.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "API key error: " + e.getMessage() + 
                ". Please set GOOGLE_API_KEY environment variable before starting the application."
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                "Error: " + e.getMessage()
            );
        }
    }
}
