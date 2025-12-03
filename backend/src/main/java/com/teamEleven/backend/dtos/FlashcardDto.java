package com.teamEleven.backend.dtos;

import com.teamEleven.backend.entities.Flashcard;

import java.time.LocalDateTime;

public class FlashcardDto {
    private Long id;
    private Long userId;
    private Byte categoryId;
    private Byte difficulty;
    private String question;
    private String answer;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FlashcardDto() {}

    public FlashcardDto(Long id, Long userId, Byte categoryId, Byte difficulty, String question, String answer) {
        this.id = id;
        this.userId = userId;
        this.categoryId = categoryId;
        this.difficulty = difficulty;
        this.question = question;
        this.answer = answer;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Byte getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Byte categoryId) {
        this.categoryId = categoryId;
    }

    public Byte getDifficulty() {
        return difficulty;
    }
    public void setDifficulty(Byte difficulty) {
        this.difficulty = difficulty;
    }

    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public String getAnswer() {
        return answer;
    }
    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "FlashcardDto{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", categoryId=" + categoryId +
                ", question='" + question+ '\'' +
                ", answer =" + answer +
                '}';
    }

}
