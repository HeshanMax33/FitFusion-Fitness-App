package dev.paf.FitFusion.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import dev.paf.FitFusion.model.MealPlan;



public interface MealPlanRepository extends MongoRepository<MealPlan,String> {
    List<MealPlan> findByDietaryPreferences(String dietaryPreferences);


    
}
