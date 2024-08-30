package dev.paf.FitFusion.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "UserRegistration")
public class User {

    @Id
    private String id;


    private String name;
    private String address;
    private List<String> phone;
    private String password;
    private String email;
    private String age;
    private byte[] image; // Store image as byte array
    // private String username; // Add username field


    





    
}
