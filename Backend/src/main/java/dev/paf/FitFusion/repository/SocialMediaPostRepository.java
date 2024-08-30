package dev.paf.FitFusion.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.paf.FitFusion.model.SocialMediaPost;

@Repository
public interface SocialMediaPostRepository extends MongoRepository<SocialMediaPost, ObjectId>{

}
