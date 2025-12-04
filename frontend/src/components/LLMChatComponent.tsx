import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listFlashcards, type Flashcard } from "../services/FlashcardsService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const LLMChatComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [isInitializing, setIsInitializing] = useState<boolean>(false);
    const [sessionId] = useState<string>(() => `session-${Date.now()}`);
    const [useStreaming, setUseStreaming] = useState<boolean>(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize chat with flashcards if category_id is provided
    useEffect(() => {
        const initializeChatWithFlashcards = async () => {
            if (!id) return; // No category_id, skip initialization
            
            setIsInitializing(true);
            try {
                // Fetch flashcards for the category
                const response = await listFlashcards(Number(id));
                const flashcards = response.data;
                
                if (flashcards.length === 0) {
                    setMessages([{
                        role: "assistant",
                        content: "No flashcards found for this category. You can still chat with me!"
                    }]);
                    setIsInitializing(false);
                    return;
                }
                
                // Send flashcards to backend to generate scenario
                const initResponse = await fetch(
                    `http://localhost:8080/api/llm-chat/chat/init?sessionId=${sessionId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ flashcards: flashcards }),
                    }
                );
                
                if (!initResponse.ok) {
                    throw new Error("Failed to initialize chat scenario");
                }
                
                const data = await initResponse.json();
                const scenario = data.scenario;
                
                // Set the scenario as the first assistant message
                setMessages([{
                    role: "assistant",
                    content: scenario
                }]);
            } catch (error) {
                console.error("Error initializing chat with flashcards:", error);
                setMessages([{
                    role: "assistant",
                    content: "I'm ready to help you practice! What would you like to work on?"
                }]);
            } finally {
                setIsInitializing(false);
            }
        };
        
        initializeChatWithFlashcards();
    }, [id, sessionId]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        if (useStreaming) {
            await handleStreamingMessage(userMessage.content);
        } else {
            await handleRegularMessage(userMessage.content);
        }
    };

    const handleRegularMessage = async (message: string) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/llm-chat/chat?sessionId=${sessionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain",
                    },
                    body: message,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();
            const assistantMessage: Message = {
                role: "assistant",
                content: data.response,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStreamingMessage = async (message: string) => {
        setIsStreaming(true);
        const assistantMessage: Message = { role: "assistant", content: "" };
        setMessages((prev) => [...prev, assistantMessage]);

        abortControllerRef.current = new AbortController();

        try {
            // Use EventSource API for proper SSE handling
            const eventSource = new EventSource(
                `http://localhost:8080/api/llm-chat/chat/stream?sessionId=${sessionId}&message=${encodeURIComponent(message)}`
            );

            // Handle chunk events
            eventSource.addEventListener("chunk", (event: MessageEvent) => {
                const data = event.data;
                if (data && data.length > 0) {
                    setMessages((prev) => {
                        const newMessages = [...prev];
                        const lastIdx = newMessages.length - 1;
                        if (lastIdx >= 0 && newMessages[lastIdx].role === "assistant") {
                            // Create new array with updated message to ensure React detects change
                            return newMessages.map((msg, idx) => 
                                idx === lastIdx && msg.role === "assistant"
                                    ? { ...msg, content: msg.content + data }
                                    : msg
                            );
                        }
                        return newMessages;
                    });
                }
            });

            // Handle done event
            eventSource.addEventListener("done", () => {
                eventSource.close();
                setIsStreaming(false);
                setIsLoading(false);
            });

            // Handle errors
            eventSource.onerror = (error) => {
                console.error("EventSource error:", error);
                eventSource.close();
                setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === "assistant") {
                        return newMessages.map((msg, idx) => 
                            idx === newMessages.length - 1 && msg.role === "assistant"
                                ? { ...msg, content: "Sorry, I encountered an error while streaming. Please try again." }
                                : msg
                        );
                    }
                    return newMessages;
                });
                setIsStreaming(false);
                setIsLoading(false);
            };

            // Store eventSource for cleanup
            (abortControllerRef.current as any).eventSource = eventSource;

        } catch (error: any) {
            console.error("Error streaming message:", error);
            setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === "assistant") {
                    return newMessages.map((msg, idx) => 
                        idx === newMessages.length - 1 && msg.role === "assistant"
                            ? { ...msg, content: "Sorry, I encountered an error. Please try again." }
                            : msg
                    );
                }
                return newMessages;
            });
            setIsStreaming(false);
            setIsLoading(false);
        }
    };

    const handleClearChat = async () => {
        try {
            await fetch(
                `http://localhost:8080/api/llm-chat/chat?sessionId=${sessionId}`,
                {
                    method: "DELETE",
                }
            );
            setMessages([]);
        } catch (error) {
            console.error("Error clearing chat:", error);
        }
    };

    const handleStopStreaming = () => {
        if (abortControllerRef.current) {
            const eventSource = (abortControllerRef.current as any).eventSource;
            if (eventSource) {
                eventSource.close();
            }
            setIsStreaming(false);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <style>{`
                .chat-container {
                    max-width: 900px;
                    margin: 100px auto 50px;
                    height: calc(100vh - 200px);
                    display: flex;
                    flex-direction: column;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }

                .chat-header {
                    padding: 1.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chat-header h1 {
                    margin: 0;
                    font-size: 1.5rem;
                }

                .chat-controls {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .streaming-toggle {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .message {
                    display: flex;
                    flex-direction: column;
                    max-width: 80%;
                    animation: fadeIn 0.3s ease-in;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .message.user {
                    align-self: flex-end;
                }

                .message.assistant {
                    align-self: flex-start;
                }

                .message-content {
                    padding: 1rem 1.25rem;
                    border-radius: 15px;
                    word-wrap: break-word;
                }

                .message-content p {
                    margin: 0.5rem 0;
                }

                .message-content p:first-child {
                    margin-top: 0;
                }

                .message-content p:last-child {
                    margin-bottom: 0;
                }

                .message-content code {
                    background: rgba(0, 0, 0, 0.1);
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9em;
                }

                .message-content pre {
                    background: rgba(0, 0, 0, 0.1);
                    padding: 1rem;
                    border-radius: 8px;
                    overflow-x: auto;
                    margin: 0.5rem 0;
                }

                .message-content pre code {
                    background: none;
                    padding: 0;
                }

                .message-content ul,
                .message-content ol {
                    margin: 0.5rem 0;
                    padding-left: 1.5rem;
                }

                .message-content li {
                    margin: 0.25rem 0;
                }

                .message-content h1,
                .message-content h2,
                .message-content h3,
                .message-content h4,
                .message-content h5,
                .message-content h6 {
                    margin: 0.75rem 0 0.5rem 0;
                    font-weight: 600;
                }

                .message-content h1:first-child,
                .message-content h2:first-child,
                .message-content h3:first-child,
                .message-content h4:first-child,
                .message-content h5:first-child,
                .message-content h6:first-child {
                    margin-top: 0;
                }

                .message-content blockquote {
                    border-left: 3px solid rgba(0, 0, 0, 0.2);
                    padding-left: 1rem;
                    margin: 0.5rem 0;
                    font-style: italic;
                }

                .message-content a {
                    color: inherit;
                    text-decoration: underline;
                }

                .message.user .message-content a {
                    color: rgba(255, 255, 255, 0.9);
                }

                .message.assistant .message-content a {
                    color: #667eea;
                }

                .message.user .message-content {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .message.assistant .message-content {
                    background: #f3f4f6;
                    color: #1f2937;
                }

                .chat-input-container {
                    padding: 1.5rem;
                    border-top: 1px solid #e5e7eb;
                    background: white;
                }

                .chat-input-wrapper {
                    display: flex;
                    gap: 0.75rem;
                    align-items: flex-end;
                }

                .chat-input {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 10px;
                    font-size: 1rem;
                    resize: none;
                    min-height: 50px;
                    max-height: 150px;
                    font-family: inherit;
                }

                .chat-input:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .send-button {
                    padding: 0.75rem 2rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .send-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                }

                .send-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .stop-button {
                    padding: 0.75rem 2rem;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .clear-button {
                    padding: 0.5rem 1rem;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .clear-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .loading-indicator {
                    display: flex;
                    gap: 0.5rem;
                    padding: 1rem;
                    color: #6b7280;
                }

                .loading-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #667eea;
                    animation: bounce 1.4s infinite ease-in-out both;
                }

                .loading-dot:nth-child(1) {
                    animation-delay: -0.32s;
                }

                .loading-dot:nth-child(2) {
                    animation-delay: -0.16s;
                }

                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }
            `}</style>

            <div className="chat-container">
                <div className="chat-header">
                    <h1>💬 AI Language Learning Chat</h1>
                    <div className="chat-controls">
                        <div className="streaming-toggle">
                            <input
                                type="checkbox"
                                id="streaming-toggle"
                                checked={useStreaming}
                                onChange={(e) => setUseStreaming(e.target.checked)}
                            />
                            <label htmlFor="streaming-toggle" style={{ fontSize: "0.9rem" }}>
                                Streaming
                            </label>
                        </div>
                        <button className="clear-button" onClick={handleClearChat}>
                            Clear Chat
                        </button>
                    </div>
                </div>

                <div className="chat-messages">
                    {isInitializing && (
                        <div style={{ textAlign: "center", color: "#6b7280", marginTop: "2rem" }}>
                            <p>Setting up your practice scenario...</p>
                            <div className="loading-indicator" style={{ justifyContent: "center", marginTop: "1rem" }}>
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                            </div>
                        </div>
                    )}
                    {!isInitializing && messages.length === 0 && (
                        <div style={{ textAlign: "center", color: "#6b7280", marginTop: "2rem" }}>
                            <p>Start a conversation! Ask me anything about language learning.</p>
                            <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                                Try: "Help me practice" or "Let's have a conversation"
                            </p>
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            <div className="message-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {messages.length > 0 && messages[messages.length - 1].role === "assistant" && 
                     (messages[messages.length - 1].content === "" || (isLoading && !isStreaming)) && (
                        <div className="loading-indicator">
                            <div className="loading-dot"></div>
                            <div className="loading-dot"></div>
                            <div className="loading-dot"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                    <div className="chat-input-wrapper">
                        <textarea
                            className="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                            disabled={isLoading || isInitializing}
                            rows={1}
                        />
                        {isStreaming ? (
                            <button
                                className="stop-button"
                                onClick={handleStopStreaming}
                            >
                                Stop
                            </button>
                        ) : (
                            <button
                                className="send-button"
                                onClick={handleSendMessage}
                                disabled={isLoading || isInitializing || !input.trim()}
                            >
                                Send
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LLMChatComponent;
