package com.fsac.wasfati.services;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fsac.wasfati.entities.Utilisateur;
import com.fsac.wasfati.repositories.UtilisateurRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + username));

            System.out.println("Tentative de connexion pour : " + username);
            System.out.println("Mot de passe récupéré (crypté) : " + utilisateur.getPassword());


    return new User(
            utilisateur.getUsername(),
            utilisateur.getPassword(),
            Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + utilisateur.getRole()) 
            )
    );
}
}
