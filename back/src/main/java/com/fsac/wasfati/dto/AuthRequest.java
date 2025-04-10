package com.fsac.wasfati.dto;

public class AuthRequest {
    private String username;
    private String password;

    public void setPassword(String password) {
        this.password = password;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public String getUsername() {
        return username;
    }
}
