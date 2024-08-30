package dev.paf.FitFusion.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.paf.FitFusion.model.CurrWorkoutStatus;
import dev.paf.FitFusion.service.CurrWorkoutStatusService;

@RestController
@RequestMapping("api/currworkout")
public class CurrWorkoutStatusCont {


    @Autowired
    private CurrWorkoutStatusService CurrWorkoutService;


    @GetMapping
    public List<CurrWorkoutStatus> getAllCurrWorkoutStatus() {
        return CurrWorkoutService.getAllCurrWorkoutStatus();
    }

    @GetMapping("/{id}")
    public CurrWorkoutStatus getCurrWorkoutStatusById(@PathVariable String id) {
        return CurrWorkoutService.getCurrWorkoutById(id);
    }

    @PostMapping
    public ResponseEntity<?> createCurrWorkout(@RequestParam("name") String name,
                                            @RequestParam("distanceRan") String distanceRan,
                                            @RequestParam("noOfPush") String noOfPush,
                                            @RequestParam("weight") String weight,
                                            @RequestParam("workoutTime") String workoutTime,
                                            @RequestParam("rest") String rest,
                                            @RequestParam("noOfExercises") String noOfExercises,
                                            @RequestParam("file") MultipartFile file) {
        try {
            byte[] imageData = file.getBytes();
            String imageUrl = saveImage(imageData); // Save image and get its URL
            CurrWorkoutStatus currWorkout = new CurrWorkoutStatus();
            currWorkout.setImageUrl(imageUrl);
            currWorkout.setName(name);
            currWorkout.setDistanceRan(distanceRan);
            currWorkout.setNoOfPush(noOfPush);
            currWorkout.setWeight(weight);
            currWorkout.setWorkoutTime(workoutTime);
            currWorkout.setRest(rest);
            currWorkout.setNoOfExercises(noOfExercises);
            CurrWorkoutStatus createdWorkoutStatus = CurrWorkoutService.createCurrWorkout(currWorkout);
            return new ResponseEntity<>(createdWorkoutStatus, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to create meal plan: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // save image
    private String saveImage(byte[] imageData) {
        try {
            String directoryPath = "/path/to/save/images/"; // Update the path as needed
    
            // Create the directory if it doesn't exist
            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }
    
            String fileName = UUID.randomUUID().toString() + ".jpg";// Generate a unique filename for the image

    
            // Define the file path
            String imagePath = directoryPath + fileName;
    
            FileOutputStream image_data_to_the_file = new FileOutputStream(imagePath);
            image_data_to_the_file.write(imageData);
            image_data_to_the_file.close();
    
            return "/images/" + fileName; // actual path
        } catch (IOException e) {
            e.printStackTrace(); 
            return "Error saving image. Please try again."; 
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateMealPlan(@PathVariable String id,
                                            @RequestParam (value = "name",required = false) String name,
                                            @RequestParam(value = "distanceRan",required  = false) String distanceRan,
                                            @RequestParam(value = "noOfPush",required = false) String noOfPush,
                                            @RequestParam(value = "weight",required = false) String weight,
                                            @RequestParam(value = "workoutTime",required = false) String workoutTime,
                                            @RequestParam(value = "rest",required = false) String rest,
                                            @RequestParam(value = "noOfExercises",required = false) String noOfExersices,                  
                                            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            CurrWorkoutStatus existingwWorkoutStatus = CurrWorkoutService.getCurrWorkoutById(id);
            if (existingwWorkoutStatus == null) {
                return new ResponseEntity<>("Meal plan not found", HttpStatus.NOT_FOUND);
            }
    
            // Check if any field is being updated
            boolean isUpdated = false;
            if (file != null && !file.isEmpty()) {
                byte[] imageData = file.getBytes();
                String imageUrl = saveImage(imageData); // Save image and get its URL
                existingwWorkoutStatus.setImageUrl(imageUrl);
                isUpdated = true;
            }
            if (name != null) {
                existingwWorkoutStatus.setName(name);
                isUpdated = true;
            }
            if ( distanceRan!= null) {
                existingwWorkoutStatus.setDistanceRan(distanceRan);
                isUpdated = true;
            }
            if (noOfPush != null) {
                existingwWorkoutStatus.setNoOfPush(noOfPush);
                isUpdated = true;
            }
            if (weight != null) {
                existingwWorkoutStatus.setWeight(weight);
                isUpdated = true;
            }
            if (workoutTime != null) {
                existingwWorkoutStatus.setWorkoutTime(workoutTime);
                isUpdated = true;
            }
            if (rest != null) {
                existingwWorkoutStatus.setRest(rest);
                isUpdated = true;
            }
            if (noOfExersices != null) {
                existingwWorkoutStatus.setNoOfExercises(noOfExersices);
                isUpdated = true;
            }
    
            if (isUpdated) {
                CurrWorkoutStatus updatedWorkoutStatus = CurrWorkoutService.updateCurrWorkoutStatus(id, existingwWorkoutStatus); // Pass both ID and updated meal plan
                return new ResponseEntity<>(updatedWorkoutStatus, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No fields provided for update", HttpStatus.BAD_REQUEST);
            }
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to update Workout Status: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    






    //Delete Meal PLan
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCurrWorkoutStatus(@PathVariable String id) {
        try {
            CurrWorkoutService.deleteCurrWorkoutStatus(id);
            return new ResponseEntity<>("Meal plan deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete workout status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    
}
