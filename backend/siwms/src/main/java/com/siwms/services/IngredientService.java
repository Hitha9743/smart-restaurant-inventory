package com.siwms.services;

import java.util.List;

import com.siwms.models.Ingredient;

public interface IngredientService {

	List<Ingredient> getAllIngredients();

	Ingredient getIngredientById(Long id);

	void addIngredient(Ingredient ingredient);

	void updateIngredient(Long id, Ingredient ingredient);

	void deleteIngredient(Long id);

}
