package com.teamEleven.backend.dtos;

import java.util.List;

public class FlashcardListRequest {
    private List<FlashcardDto> flashcards;

    public FlashcardListRequest() {
    }

    public FlashcardListRequest(List<FlashcardDto> flashcards) {
        this.flashcards = flashcards;
    }

    public List<FlashcardDto> getFlashcards() {
        return flashcards;
    }

    public void setFlashcards(List<FlashcardDto> flashcards) {
        this.flashcards = flashcards;
    }
}

