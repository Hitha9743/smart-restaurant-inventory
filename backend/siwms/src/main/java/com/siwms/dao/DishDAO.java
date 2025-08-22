package com.siwms.dao;

import com.siwms.models.Dish;
import com.siwms.models.DishIngredient;
import java.util.List;

public interface DishDAO {
    List<Dish> getAll();
    Dish getById(Long id);
    void add(Dish dish, List<String> ingredientNames);
    void update(Long id, Dish dish, List<String> ingredientNames);
    void delete(Long id);

    List<DishIngredient> getIngredientsForDish(Long dishId);
}
