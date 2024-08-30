package dev.paf.FitFusion.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import dev.paf.FitFusion.model.User;
import dev.paf.FitFusion.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // @GetMapping("/{id}")
    // public ResponseEntity<User> getUserDetailsById(@PathVariable String id) {
    //     User user = userService.getUserDetailsById(id);
    //     return ResponseEntity.ok().body(user);
    // }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserDetailsById(@PathVariable String id) {
        User user = userService.getUserDetailsById(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        // return ResponseEntity.ok().body(user);
    }






    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // @GetMapping
    // public ResponseEntity<List<User>> getAllUsers() {
    //     List<User> users = userService.getAllUsers();
    //     return ResponseEntity.ok().body(users);
    // }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestParam("name") String name,
                                            @RequestParam("address") String address,
                                            @RequestParam("phone") List<String> phone,
                                            @RequestParam("password") String password,
                                            @RequestParam("email") String email,
                                            @RequestParam("age") String age,
                                            @RequestParam("file") MultipartFile file) {
        try {
            byte[] imageData = file.getBytes();
            User user = new User();
            user.setImage(imageData);
            user.setName(name);
            user.setAddress(address);
            user.setPhone(phone);
            user.setPassword(password);
            user.setEmail(email);
            user.setAge(age);
            User createdUser = userService.createUserAccount(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // save image method

    // @PutMapping("/{id}")
    // public ResponseEntity<User> updateUser(@PathVariable String id,
    //                                         @RequestBody User userDetails) {
    //     User updatedUser = userService.updateUserDetails(id, userDetails);
    //     return ResponseEntity.ok().body(updatedUser);
    // }

@PutMapping("/{id}")
public ResponseEntity<?> updateUser(@PathVariable String id,
@RequestParam(value = "name", required = false) String name,
@RequestParam(value = "address", required = false) String address,
@RequestParam(value = "phone", required = false) List<String> phone,
@RequestParam(value = "password", required = false) String password,
@RequestParam(value = "email", required = false) String email,
@RequestParam(value = "age", required = false) String age,
@RequestParam(value = "file", required = false) MultipartFile file) {
try {
User existingUser = userService.getUserDetailsById(id);
if (existingUser == null) {
return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
}
boolean isUpdated = false;
if(file != null && file.isEmpty()) {
    byte[] imageData = file.getBytes();
    existingUser.setImage(imageData);
    isUpdated =true;
}
if(name != null) {
    existingUser.setName(name);
    isUpdated = true;
}
if(address != null) {
    existingUser.setAddress(address);
    isUpdated = true;
}
if(phone != null) {
    existingUser.setPhone(phone);
    isUpdated = true;
}
if(password != null) {
    existingUser.setPassword(password);
    isUpdated = true;
}
if(email != null) {
    existingUser.setEmail(email);
    isUpdated = true;
}
if(age != null) {
    existingUser.setAge(age);   
    isUpdated = true;
}
if(isUpdated) {
    User updatedUser = userService.updateUserDetails(id, existingUser);
    return new ResponseEntity<>(updatedUser, HttpStatus.OK);
} else {
    return new ResponseEntity<>("No fields to update", HttpStatus.BAD_REQUEST);
}
} catch (IOException e) {
    return new ResponseEntity<>("Failed to update user: " + e.getMessage(), HttpStatus.BAD_REQUEST);
}
}







    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        try  {
            userService.deleteUser(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }







    // private String saveImage(byte[] imageData) throws IOException {
    //     String directoryPath = "/path/to/save/images/";
    //     File directory = new File(directoryPath);
    //     if (!directory.exists()) {
    //         directory.mkdirs();
    //     }
    //     String fileName = UUID.randomUUID().toString() + ".jpg";
    //     String imagePath = directoryPath + fileName;
    //     try (FileOutputStream imageOutputStream = new FileOutputStream(imagePath)) {
    //         imageOutputStream.write(imageData);
    //     }
    //     return "/images/" + fileName;
    // }
}
