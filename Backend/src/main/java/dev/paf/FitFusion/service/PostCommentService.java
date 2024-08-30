package dev.paf.FitFusion.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.paf.FitFusion.model.PostComment;
import dev.paf.FitFusion.repository.PostCommentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostCommentService {

    @Autowired
    private PostCommentRepository postCommentRepository;

    public PostComment createComment(String postId, String userId, String text) {
        PostComment comment = new PostComment(postId, userId, text);
        return postCommentRepository.insert(comment);
    }

    public Optional<PostComment> getSingleComment(ObjectId id) {
        return postCommentRepository.findById(id);
    }

    public List<PostComment> getAllComments() {
        return postCommentRepository.findAll();
    }

    public PostComment updateComment(ObjectId id, String text) {
        Optional<PostComment> optionalComment = postCommentRepository.findById(id);
        if (optionalComment.isPresent()) {
            PostComment comment = optionalComment.get();
            comment.setText(text);
            return postCommentRepository.save(comment);
        } else {
            // Handle if comment not found
            return null;
        }
    }

    public void deleteAllComments() {
        postCommentRepository.deleteAll();
    }

    public void deleteComment(ObjectId id) {
        postCommentRepository.deleteById(id);
    }
}
