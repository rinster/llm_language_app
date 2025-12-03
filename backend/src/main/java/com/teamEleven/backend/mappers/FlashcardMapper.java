package com.teamEleven.backend.mappers;

import com.teamEleven.backend.dtos.FlashcardDto;
import com.teamEleven.backend.entities.Flashcard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FlashcardMapper {

    @Mapping(source="category.id", target="categoryId")
    @Mapping(source="user.id", target="userId")
    FlashcardDto toDto(Flashcard flashcard);

    Flashcard toEntity(FlashcardDto flashcardDto);
}
