package com.siwms.services;

import com.siwms.dao.DishDAO;
import com.siwms.models.Dish;
import com.siwms.models.DishIngredient;
import com.siwms.services.DishService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class DishServiceImpl implements DishService {

	private final DishDAO dishDAO;

	public DishServiceImpl(DishDAO dishDAO) {
		this.dishDAO = dishDAO;
	}

	@Override
	public List<Dish> getAll() {
		return dishDAO.getAll();
	}

	@Override
	public Dish getById(Long id) {
		return dishDAO.getById(id);
	}

	@Override
	public List<DishIngredient> getIngredientsForDish(Long dishId) {
		return dishDAO.getIngredientsForDish(dishId);
	}

	@Override
	@Transactional
	public void add(Dish dish, List<String> ingredientNames) {
		dishDAO.add(dish, ingredientNames);
	}

	@Override
	@Transactional
	public void update(Long id, Dish dish, List<String> ingredientNames) {
		dishDAO.update(id, dish, ingredientNames);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		dishDAO.delete(id);
	}
}
