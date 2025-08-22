package com.siwms.dao;

import com.siwms.dao.DishDAO;
import com.siwms.models.Dish;
import com.siwms.models.DishIngredient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DishDAOImpl implements DishDAO {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Dish> getAll() {
        String sql = "SELECT * FROM dishes";
        return em.createNativeQuery(sql, Dish.class).getResultList();
    }

    @Override
    public Dish getById(Long id) {
        return em.find(Dish.class, id);
    }

    @Override
    @Transactional
    public void add(Dish dish, List<String> ingredientNames) {
        em.persist(dish); // generates ID
        if (ingredientNames != null) {
            for (String name : ingredientNames) {
                em.createNativeQuery("INSERT INTO dish_ingredients(dish_id, name) VALUES (?,?)")
                  .setParameter(1, dish.getId())
                  .setParameter(2, name)
                  .executeUpdate();
            }
        }
    }

    @Override
    @Transactional
    public void update(Long id, Dish dish, List<String> ingredientNames) {
        dish.setId(id);
        em.merge(dish);
        // replace ingredients
        em.createNativeQuery("DELETE FROM dish_ingredients WHERE dish_id=?")
          .setParameter(1, id).executeUpdate();
        if (ingredientNames != null) {
            for (String name : ingredientNames) {
                em.createNativeQuery("INSERT INTO dish_ingredients(dish_id, name) VALUES (?,?)")
                  .setParameter(1, id).setParameter(2, name).executeUpdate();
            }
        }
    }

    @Override
    @Transactional
    public void delete(Long id) {
        // delete children first (if FK not ON DELETE CASCADE)
        em.createNativeQuery("DELETE FROM dish_ingredients WHERE dish_id=?")
          .setParameter(1, id).executeUpdate();
        Dish managed = em.find(Dish.class, id);
        if (managed != null) em.remove(managed);
    }

    @Override
    public List<DishIngredient> getIngredientsForDish(Long dishId) {
        String sql = "SELECT * FROM dish_ingredients WHERE dish_id=?";
        return em.createNativeQuery(sql, DishIngredient.class)
                 .setParameter(1, dishId)
                 .getResultList();
    }
}
