package com.teamEleven.backend.mappers;

import com.teamEleven.backend.dtos.RegisterUserRequest;
import com.teamEleven.backend.dtos.UpdateUserRequest;
import com.teamEleven.backend.dtos.UserDto;
import com.teamEleven.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "currentScore", target = "current_score")
    @Mapping(target = "id", ignore = false)
    @Mapping(target = "name", ignore = false)
    @Mapping(target = "email", ignore = false)
    UserDto toDto(User user);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "currentScore", ignore = true)
    User toEntity(RegisterUserRequest request);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "currentScore", ignore = true)
    void update(UpdateUserRequest request, @MappingTarget User user);
}
