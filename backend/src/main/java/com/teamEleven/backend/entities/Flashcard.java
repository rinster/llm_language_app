package com.teamEleven.backend.entities;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name="flashcards")
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name ="user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "question")
    private String question;

    @Column(name="answer")
    private String answer;

    @Column(name="difficulty")
    private int difficulty;

    @Column(name="created_at")
    private Timestamp created_at;

    @Column(name="updated_at")
    private Timestamp updated_at;

    public Flashcard() {}

    public Flashcard(Long id, User user, Category category, String question, String answer, int difficulty){
        this.id = id;
        this.user = user;
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Category getCategory() {
        return category;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public int getDifficulty() {
        return difficulty;
    }
}
