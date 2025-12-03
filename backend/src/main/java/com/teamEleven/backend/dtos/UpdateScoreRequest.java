package com.teamEleven.backend.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateScoreRequest {
    
    @NotNull(message = "Points to add is required")
    @Min(value = 0, message = "Points must be non-negative")
    private Integer points;

    public UpdateScoreRequest() {
    }

    public UpdateScoreRequest(Integer points) {
        this.points = points;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}

