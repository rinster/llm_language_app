package com.teamEleven.backend.controllers;

import com.teamEleven.backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "http://localhost:3000")
public class GeminiLLMController {

    private final GeminiService geminiService;

    public GeminiLLMController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/ask")
    public String askGeminiAPI(@RequestBody String prompt) {
        return geminiService.askGemini(prompt);
    }
}
