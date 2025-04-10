package com.fsac.wasfati.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fsac.wasfati.entities.Recette;

public interface RecetteRepository extends JpaRepository<Recette, Long> {
    @Query("SELECT DISTINCT r FROM Recette r LEFT JOIN r.ingredients i " +
       "WHERE LOWER(r.titre) LIKE LOWER(CONCAT('%', :query, '%')) " +
       "OR LOWER(r.description) LIKE LOWER(CONCAT('%', :query, '%')) " +
       "OR LOWER(i.nom) LIKE LOWER(CONCAT('%', :query, '%'))")
Page<Recette> searchByQuery(@Param("query") String query, Pageable pageable);
}
