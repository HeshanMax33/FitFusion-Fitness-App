package dev.paf.FitFusion.repository;
import java.util.List;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import dev.paf.FitFusion.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByEmail(String email);
}
