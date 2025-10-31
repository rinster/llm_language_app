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
    UserDto toDto(User user);
    
    @Mapping(target = "id", ignore = true)
    User toEntity(RegisterUserRequest request);
    
    void update(UpdateUserRequest request, @MappingTarget User user);
}
