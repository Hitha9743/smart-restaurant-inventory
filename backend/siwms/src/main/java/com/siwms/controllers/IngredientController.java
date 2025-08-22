package com.siwms.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siwms.models.Ingredient;
import com.siwms.services.IngredientService;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

	@Autowired
	private IngredientService ingredientService;

	// Show all the ingredients
	@GetMapping
	public List<Ingredient> viewAllIngredients() {
		return ingredientService.getAllIngredients();
	}

	// Get ingredient by ID
	@GetMapping("/{id}")
	public Ingredient getIngredientById(@PathVariable Long id) {
		return ingredientService.getIngredientById(id);
	}

	// Add new ingredient
	@PostMapping
	public  ResponseEntity<String> addIngredient(@RequestBody Ingredient ingredient) {
		ingredientService.addIngredient(ingredient);
	    return ResponseEntity.ok("Ingredient added successfully!");
	}

	// Update existing ingredient
	@PutMapping("/{id}")
	public String updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredient) {
		ingredientService.updateIngredient(id, ingredient);
		return "Ingredient updated successfully!";
	}

	// Delete ingredient by ID
	// Controller
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteIngredient(@PathVariable Long id) {
	    ingredientService.deleteIngredient(id);
	    return ResponseEntity.ok("Ingredient deleted successfully!");
	}


}
