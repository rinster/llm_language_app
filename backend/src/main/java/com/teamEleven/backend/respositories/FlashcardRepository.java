package com.teamEleven.backend.respositories;

import com.teamEleven.backend.entities.Category;
import com.teamEleven.backend.entities.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    List<Flashcard> findByCategoryId(Byte categoryId);
    
    @Query("SELECT f FROM Flashcard f JOIN FETCH f.category")
    List<Flashcard> findAllWithCategory();
}
