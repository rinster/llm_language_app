package com.teamEleven.backend.config;

import com.google.genai.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class GeminiConfig {

    @Bean
    @Lazy
    public Client getClient() {
        String apiKey = System.getenv("GOOGLE_API_KEY");
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalStateException(
                    "GOOGLE_API_KEY environment variable must be set. " +
                            "Set it before starting the application: export GOOGLE_API_KEY=your_api_key"
            );
        }
        return new Client();
    }
}
