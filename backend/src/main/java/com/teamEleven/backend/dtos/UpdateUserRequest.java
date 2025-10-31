package com.teamEleven.backend.dtos;

import java.time.LocalDateTime;

public class UpdateUserRequest {
    private String name;
    private String email;

    public UpdateUserRequest() {
    }

    public UpdateUserRequest(Long id, String name, String email, String phoneNumber, LocalDateTime createdAt) {

        this.name = name;
        this.email = email;
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
}

