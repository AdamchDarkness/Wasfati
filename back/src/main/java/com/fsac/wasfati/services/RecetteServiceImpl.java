package com.fsac.wasfati.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.fsac.wasfati.dto.IngredientDTO;
import com.fsac.wasfati.dto.RecetteDTO;
import com.fsac.wasfati.entities.Ingredient;
import com.fsac.wasfati.entities.Recette;
import com.fsac.wasfati.entities.Utilisateur;
import com.fsac.wasfati.repositories.RecetteRepository;
import com.fsac.wasfati.repositories.UtilisateurRepository;

import jakarta.transaction.Transactional;

@Service
public class RecetteServiceImpl implements RecetteService {

    @Autowired
    private RecetteRepository recetteRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        }
        return principal.toString();
    }

    @Override
    public List<Recette> getAll() {
        return recetteRepository.findAll();
    }

    @Override
    public Recette getById(Long id) {
        return recetteRepository.findById(id).orElseThrow();
    }

    @Transactional
    @Override
    public Recette create(RecetteDTO dto) {
        Recette r = new Recette();
        r.setTitre(dto.getTitre());
        r.setDescription(dto.getDescription());
        r.setImgLink(dto.getImgLink());
        r.setTempsMinute(dto.getTempsMinute());
        r.setCreatedBy(getCurrentUsername());

        List<Ingredient> ingredients = new ArrayList<>();
        for (IngredientDTO ing : dto.getIngredients()) {
            Ingredient i = new Ingredient();
            i.setNom(ing.getNom());
            i.setQuantite(ing.getQuantite());
            i.setRecette(r);
            ingredients.add(i);
        }

        r.setIngredients(ingredients);
        return recetteRepository.save(r);
    }

    @Override
    @Transactional
    public Recette update(Long id, RecetteDTO dto) {
        Recette r = recetteRepository.findById(id).orElseThrow();
        String username = getCurrentUsername();
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!r.getCreatedBy().equals(username) && utilisateur.getRole() != Utilisateur.Role.ADMIN) {
            throw new RuntimeException("Vous n'avez pas le droit de modifier cette recette");
        }

        if (dto.getTitre() != null) r.setTitre(dto.getTitre());
        if (dto.getDescription() != null) r.setDescription(dto.getDescription());
        if (dto.getImgLink() != null) r.setImgLink(dto.getImgLink());
        if (dto.getTempsMinute() != 0) r.setTempsMinute(dto.getTempsMinute());

        if (dto.getIngredients() != null) {
            r.getIngredients().clear();
            for (IngredientDTO ingDTO : dto.getIngredients()) {
                Ingredient ing = new Ingredient();
                ing.setNom(ingDTO.getNom());
                ing.setQuantite(ingDTO.getQuantite());
                ing.setRecette(r);
                r.getIngredients().add(ing);
            }
        }

        return recetteRepository.save(r);
    }

    @Override
    public void delete(Long id) {
        Recette r = recetteRepository.findById(id).orElseThrow();
        String username = getCurrentUsername();
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!r.getCreatedBy().equals(username) && utilisateur.getRole() != Utilisateur.Role.ADMIN) {
            throw new RuntimeException("Vous n'avez pas le droit de supprimer cette recette");
        }

        recetteRepository.deleteById(id);
    }

    @Override
    public Page<Recette> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recetteRepository.findAll(pageable);
    }

    @Override
    public Page<Recette> search(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recetteRepository.searchByQuery(query, pageable);
    }
}