package com.teamEleven.backend.dtos;

import java.time.LocalDateTime;

public class UserDto {

    private Long id;
    private String name;
    private String email;
    private int current_score;

    public UserDto() {
    }

    public UserDto(Long id, String name, String email,  LocalDateTime createdAt, Integer current_score) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.current_score = current_score;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public int getCurrent_score() {return current_score;}
    public void setCurrent_score(int current_score) {this.current_score = current_score;}

}

