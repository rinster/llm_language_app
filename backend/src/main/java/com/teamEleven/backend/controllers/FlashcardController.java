package com.teamEleven.backend.controllers;

import com.teamEleven.backend.dtos.FlashcardDto;
import com.teamEleven.backend.mappers.FlashcardMapper;
import com.teamEleven.backend.respositories.CategoryRepository;
import com.teamEleven.backend.respositories.FlashcardRepository;
import com.teamEleven.backend.service.FlashcardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flashcards")
@CrossOrigin(origins = "http://localhost:3000")
public class FlashcardController {
    private final FlashcardRepository flashcardRepository;
    private final FlashcardMapper flashcardMapper;
    private final CategoryRepository categoryRepository;
    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardRepository flashcardRepository, FlashcardMapper flashcardMapper, CategoryRepository categoryRepository, FlashcardService flashcardService) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardMapper = flashcardMapper;
        this.categoryRepository = categoryRepository;
        this.flashcardService = flashcardService;

    }

    @GetMapping
    public ResponseEntity<Iterable<FlashcardDto>> getAllFlashcards(@RequestParam(required = false, name="categoryId") Byte categoryId) {
        Iterable<FlashcardDto> flashcards = flashcardService.getAllFlashcards(categoryId);
        return ResponseEntity.ok(flashcards);
    }
}
