# Technical Documentation - Wasfati Recipe Management Application

## Overview
Wasfati is a web application for managing and sharing recipes. It includes a Spring Boot backend and a React-based frontend. JWT authentication is implemented, with two user roles: ADMIN and USER. Non-authenticated users can view recipes. Authenticated users can manage their own recipes, while admins can manage all recipes.

---


https://github.com/user-attachments/assets/7ce349c9-a1df-4180-9abe-f959b27386ab


---

## Backend (Spring Boot)

### Entities
- **Utilisateur**
  - `id`, `username`, `password`, `role`
  - Enum `Role { ADMIN, USER }`

- **Recette**
  - `id`, `titre`, `description`, `tempsMinute`, `imgLink`, `createdBy`, `dateCreation`, `dateModification`, `updatedBy`
  - Relationship: OneToMany with `Ingredient`

- **Ingredient**
  - `id`, `nom`, `quantite`, `recette`
  - Relationship: ManyToOne with `Recette`

### DTOs
- `RecetteDTO`: contains title, description, image link, preparation time, list of `IngredientDTO`.
- `IngredientDTO`: contains name and quantity.
- `AuthRequest`, `AuthResponse`, `RegisterRequest`: used for authentication endpoints.

### Repositories
- `UtilisateurRepository`: find by username.
- `RecetteRepository`: includes full text search (`searchByQuery`) using custom query.

### Services
- `UtilisateurServiceImpl`: save users and fetch by username.
- `RecetteServiceImpl`: CRUD for recipes with security checks on update/delete using the current username and user role.

### Security
- `JwtFilter`: intercepts requests and validates tokens.
- `JwtService`: generates and validates JWT tokens.
- `SecurityConfiguration`: configures Spring Security with role-based authorization.
- Stateless session.

### Controllers
- `/api/auth/register`: register new user.
- `/api/auth/login`: login and return JWT.
- `/api/recettes`: 
  - GET: all or paginated recipes
  - GET `/search`: search recipes by keyword
  - POST: create recipe (auth required)
  - PUT `/id`: update recipe (auth + permission check)
  - DELETE `/id`: delete recipe (auth + permission check)

---

## Frontend (React)

### Pages
- `Login.jsx`: handles JWT login and stores token in localStorage.
- `Register.jsx`: handles registration.
- `Home.jsx`: lists recipes, shows search bar, paginated view.
- `AddRecipe.jsx`: form to create or update a recipe depending on route.

### Components
- `Header`: navigation.
- `SearchBar`: real-time search with clear button.
- `FilterSection`: shows total number of recipes.
- `Pagination`: page navigation.
- `RecipeList`: renders cards with ingredients, edit/delete buttons (only for owners).

### Features
- Only authenticated users can add/edit/delete.
- Edit page pre-fills the form.
- Conditional buttons based on login status and `createdBy` match.
- Ingredients added dynamically in the form.

### Token Handling
- Token saved in `localStorage` as `token`.
- Username saved as `username`.
- All POST/PUT/DELETE requests send token in `Authorization: Bearer <token>` header.

---

## Backend Technologies
- Spring Boot 3
- Spring Security
- JWT
- JPA/Hibernate
- MySQL

## Frontend Technologies
- React (Vite)
- Bootstrap
- Custom CSS

---

## Notes
- The `imgLink` field must be of sufficient length in MySQL (`VARCHAR(1000)` recommended).
- Ingredients are embedded in the JSON body and mapped manually in `RecetteServiceImpl`.
- Pagination is 0-indexed for backend.

---
