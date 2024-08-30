package dev.paf.FitFusion.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.paf.FitFusion.model.CurrWorkoutStatus;
import dev.paf.FitFusion.repository.CurrWorkoutStatusRepo;

@Service
public class CurrWorkoutStatusService {
    @Autowired
    private CurrWorkoutStatusRepo CurrentWorkoutRepo;

    public List<CurrWorkoutStatus> getAllCurrWorkoutStatus(){
        return CurrentWorkoutRepo.findAll();
    }
    public CurrWorkoutStatus getCurrWorkoutById(String id){
        return CurrentWorkoutRepo.findById(id).orElse(null);
    }
    public CurrWorkoutStatus createCurrWorkout(CurrWorkoutStatus workoutStatus){
        return CurrentWorkoutRepo.save(workoutStatus);
    }
    public CurrWorkoutStatus updateCurrWorkoutStatus(String id , CurrWorkoutStatus workoutStatus){
        workoutStatus.setId(id);
        return CurrentWorkoutRepo.save(workoutStatus); 
    }
    public void  deleteCurrWorkoutStatus(String id){
        CurrentWorkoutRepo.deleteById(id);
    }
    
}
