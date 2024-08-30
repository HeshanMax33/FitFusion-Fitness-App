package dev.paf.FitFusion.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import dev.paf.FitFusion.model.PostComment;
import dev.paf.FitFusion.model.SocialMediaPost;
import dev.paf.FitFusion.service.SocialMediaPostService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/socialMediaPost")

public class SocialMediaPostController {

    @Autowired
    private SocialMediaPostService socialMediaPostService;

    @GetMapping
    public ResponseEntity<List<SocialMediaPost>> getAllPosts() {
        List<SocialMediaPost> posts = socialMediaPostService.allPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<SocialMediaPost>> getSinglePost(@PathVariable ObjectId id) {
        Optional<SocialMediaPost> post = socialMediaPostService.getSinglePost(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SocialMediaPost> createPost(
            @RequestParam("postDescription") String postDescription,
            @RequestParam("postImages") List<MultipartFile> postImages,
            @RequestParam("postVideos") List<MultipartFile> postVideos,
            @RequestParam(name = "comments", required = false) List<PostComment> comments,
            @RequestParam(name = "likes", required = false) int likes) {

                // Extracting IDs from PostComment objects
                List<String> commentIds = comments.stream()
                                                  .map(comment -> comment.getId().toString()) // Convert ObjectId to String
                                                  .collect(Collectors.toList());

                SocialMediaPost createdPost = socialMediaPostService.createPost(postDescription,
                        postImages, postVideos, commentIds, likes);
                return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
            }

    @PutMapping("/{id}")
    public ResponseEntity<SocialMediaPost> updatePost(
            @PathVariable ObjectId id,
            @RequestParam("postDescription") String postDescription,
            @RequestParam("postImages") List<MultipartFile> postImages,
            @RequestParam("postVideos") List<MultipartFile> postVideos,
            @RequestParam(name = "comments", required = false) List<PostComment> comments,
            @RequestParam(name = "likes", required = false) int likes) {
    
        // Convert MultipartFiles to byte arrays
        List<byte[]> imageBytes = postImages.stream()
                                            .map(file -> {
                                                try {
                                                    return file.getBytes();
                                                } catch (IOException e) {
                                                    throw new RuntimeException("Failed to read image file", e);
                                                }
                                            })
                                            .collect(Collectors.toList());
    
        List<byte[]> videoBytes = postVideos.stream()
                                            .map(file -> {
                                                try {
                                                    return file.getBytes();
                                                } catch (IOException e) {
                                                    throw new RuntimeException("Failed to read video file", e);
                                                }
                                            })
                                            .collect(Collectors.toList());
    
        // Extracting comment IDs from PostComment objects
        List<String> commentIds = comments.stream()
                         .map(comment -> comment.getId().toString()) // Convert ObjectId to String
                         .collect(Collectors.toList());

        SocialMediaPost updatedPost = socialMediaPostService.updatePost(id, postDescription,
            imageBytes, videoBytes, commentIds, likes);
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }
    

    @PostMapping("/{id}/like")
public ResponseEntity<SocialMediaPost> likePost(@PathVariable ObjectId id) {
    SocialMediaPost likedPost = socialMediaPostService.likePost(id);
    if (likedPost != null) {
        return new ResponseEntity<>(likedPost, HttpStatus.OK);
    } else {
        // Handle if post not found
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable ObjectId id) {
        socialMediaPostService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllPosts() {
        socialMediaPostService.deleteAllPosts();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
