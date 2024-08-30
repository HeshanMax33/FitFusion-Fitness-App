package dev.paf.FitFusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.paf.FitFusion.model.User;
import dev.paf.FitFusion.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserDetailsById(String id) {
        return userRepository.findById(id).orElse(null);
    }


    public User createUserAccount(User user) {
        return userRepository.save(user);
    }

    public User updateUserDetails(String id, User userDetails) {
        userDetails.setId(id);
        return userRepository.save(userDetails);
    }

    public void deleteUserDetails(String id) {
        userRepository.deleteById(id);
    }

    public List<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
