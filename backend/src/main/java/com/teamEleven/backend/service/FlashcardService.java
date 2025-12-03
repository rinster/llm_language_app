package com.teamEleven.backend.service;

import com.teamEleven.backend.dtos.FlashcardDto;
import com.teamEleven.backend.entities.Flashcard;
import com.teamEleven.backend.mappers.FlashcardMapper;
import com.teamEleven.backend.respositories.FlashcardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final FlashcardMapper flashcardMapper;

    private FlashcardService(FlashcardRepository flashcardRepository, FlashcardMapper flashcardMapper) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardMapper = flashcardMapper;
    }

    public List<FlashcardDto> getAllFlashcards(Byte categoryId){
        List<Flashcard> flashcards;
        if (categoryId == null) {
            flashcards = flashcardRepository.findAllWithCategory();
        } else {
            flashcards = flashcardRepository.findByCategoryId(categoryId);
        }
        return flashcards.stream().map(flashcardMapper::toDto).toList();
    }
}


