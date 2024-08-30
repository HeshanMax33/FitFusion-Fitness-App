package dev.paf.FitFusion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "CurrentWorkoutStatus")
public class CurrWorkoutStatus {

    @Id
    private String Id;

    
    private String name;
    private String distanceRan;
    private String noOfPush;
    private String weight;
    private String workoutTime;
    private String rest;
    private String noOfExercises;
    private String imageUrl; //optional
    
}