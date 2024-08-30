package dev.paf.FitFusion.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import dev.paf.FitFusion.model.CurrWorkoutStatus;

public interface CurrWorkoutStatusRepo extends MongoRepository<CurrWorkoutStatus,String>{

}
