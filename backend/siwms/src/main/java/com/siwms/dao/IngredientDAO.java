package com.siwms.dao;

import java.util.List;

import com.siwms.models.Ingredient;

public interface IngredientDAO {

	List<Ingredient> getAllIngredients();

	Ingredient getIngredientById(Long id);

	void saveIngredient(Ingredient ingredient);

	void updateIngredient(Long id, Ingredient ingredient);

	void deleteIngredient(Long id);

}
