package com.teamEleven.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service

public class GeminiService {


    private final Client client;

    public GeminiService(Client client) {
        this.client = client;
    }

    public String askGemini(String prompt) {
        GenerateContentResponse response = client.models.generateContent(
                "gemini-2.5-flash",
                prompt,
                null);

        System.out.println(response);
        return response.text();
    }
}
