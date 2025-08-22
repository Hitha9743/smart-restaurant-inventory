package com.siwms.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.siwms.models.Ingredient;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@Repository
public class IngredientDAOImpl implements IngredientDAO {

	@Autowired
	private EntityManager entityManager;

	
	//for getting all the ingredients
	@SuppressWarnings("unchecked")
	@Override
	public List<Ingredient> getAllIngredients() {
	    try {
	        String sql = "SELECT * FROM Ingredients"; // Table name in DB
	        return entityManager.createNativeQuery(sql, Ingredient.class).getResultList();
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ArrayList<>();
	    }
	}

	
	//for getting ingredient by id
	@Override
	public Ingredient getIngredientById(Long id) {
		String sql = "SELECT * FROM ingredients WHERE ingredientId = : id";
		Query query = entityManager.createNamedQuery(sql, Ingredient.class);
		query.setParameter("id", id);
		return (Ingredient) query.getSingleResult();
	}

	
	//for saving the ingredient
	@Override
	public void saveIngredient(Ingredient ingredient) {
		entityManager.persist(ingredient); 
	}

	
	//for updating the ingredient
	@Override
	public void updateIngredient(Long id, Ingredient ingredient) {
		ingredient.setIngredientId(id);
		entityManager.merge(ingredient);
	}

	
	//for deleting the ingredient
	@Override
	public void deleteIngredient(Long id) {
		Ingredient ing = entityManager.find(Ingredient.class, id);
		if (ing != null)
			entityManager.remove(ing);
	}

}
