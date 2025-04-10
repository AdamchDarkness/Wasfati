package com.fsac.wasfati.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fsac.wasfati.dto.RecetteDTO;
import com.fsac.wasfati.entities.Recette;
import com.fsac.wasfati.services.RecetteService;

@RestController
@RequestMapping("/api/recettes")
public class RecetteController {

    @Autowired
    private RecetteService recetteService;

    @GetMapping
    public ResponseEntity<?> getRecettes(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        if (page != null && size != null) {
            Page<Recette> paginated = recetteService.getPaginated(page, size);
            return ResponseEntity.ok(paginated);
        } else {
            List<Recette> all = recetteService.getAll();
            return ResponseEntity.ok(all);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recette> getById(@PathVariable Long id) {
        return ResponseEntity.ok(recetteService.getById(id));
    }

    @PostMapping
    public Recette create(@RequestBody RecetteDTO recetteDTO) {
        return recetteService.create(recetteDTO);
    }

    @PutMapping("/{id}")
    public Recette update(@PathVariable Long id, @RequestBody RecetteDTO recetteDTO) {
        return recetteService.update(id, recetteDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        recetteService.delete(id);
    }

    @GetMapping("/search")
    public Page<Recette> searchRecettes(
            @RequestParam("query") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return recetteService.search(query, page, size);
    }



}
