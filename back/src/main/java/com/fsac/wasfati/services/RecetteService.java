package com.fsac.wasfati.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.fsac.wasfati.dto.RecetteDTO;
import com.fsac.wasfati.entities.Recette;

public interface RecetteService {
    List<Recette> getAll();
    Recette getById(Long id);
    Recette create(RecetteDTO dto);
    Recette update(Long id, RecetteDTO dto);
    void delete(Long id);
    public Page<Recette> getPaginated(int page, int size);
    Page<Recette> search(String query, int page, int size);
}
