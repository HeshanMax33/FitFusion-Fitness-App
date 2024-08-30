package dev.paf.FitFusion.repository;
 
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
 
import dev.paf.FitFusion.model.PostComment;
 
@Repository
public interface PostCommentRepository  extends MongoRepository<PostComment, ObjectId>{
 
}