package dev.paf.FitFusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.paf.FitFusion.model.MealPlan;
import dev.paf.FitFusion.repository.MealPlanRepository;

@Service
public class MealPlanService {
    @Autowired
    private MealPlanRepository mealPlanRepository;

    public List<MealPlan> getAllMealPlans() {
        return mealPlanRepository.findAll();
    }

    public MealPlan getMealPlanById(String id) {
        return mealPlanRepository.findById(id).orElse(null);
    }

    public MealPlan createMealPlan(MealPlan mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }



    public MealPlan updateMealPlan(String id, MealPlan mealPlan) {
        mealPlan.setId(id);
        return mealPlanRepository.save(mealPlan);
    }
    

    public void deleteMealPlan(String id) {
        mealPlanRepository.deleteById(id);
    }

    public List<MealPlan> getMealPlansByDietaryPreference(String dietaryPreference) {
        return mealPlanRepository.findByDietaryPreferences(dietaryPreference);
    }

    
}
