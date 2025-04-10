package com.fsac.wasfati.services;

import java.util.Optional;

import com.fsac.wasfati.entities.Utilisateur;

public interface UtilisateurService {
    Utilisateur save(Utilisateur utilisateur);
    Optional<Utilisateur> findByUsername(String username);
}
