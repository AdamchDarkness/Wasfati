package com.fsac.wasfati.dto;

import java.util.List;

public class RecetteDTO {
    private String titre;
    private String description;
    private String imgLink;
    private int tempsMinute;
    private List<IngredientDTO> ingredients;

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
    }

    public String getImgLink() {
        return imgLink;
    }

    public void setTempsMinute(int tempsMinute) {
        this.tempsMinute = tempsMinute;
    }

    public int getTempsMinute() {
        return tempsMinute;
    }

    public List<IngredientDTO> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientDTO> ingredients) {
        this.ingredients = ingredients;
    }

    

}
