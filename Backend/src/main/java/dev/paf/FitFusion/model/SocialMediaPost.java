package dev.paf.FitFusion.model;

import org.bson.types.ObjectId; // Import ObjectId from org.bson.types
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "socialMediaPosts")
public class SocialMediaPost {

    @Id
    private ObjectId id; // Change the type of id to ObjectId

    private String postDescription;
    private List<byte[]> postImages;
    private List<byte[]> postVideos;
    private List<PostComment> comments;
    private int likeCount; // Represents the total count of likes for this post

    public SocialMediaPost(String postDescription, List<byte[]> postImages, List<byte[]> postVideos,
                           List<PostComment> comments, int likeCount) {
        this.postDescription = postDescription;
        this.postImages = postImages;
        this.postVideos = postVideos;
        this.comments = comments;
        this.likeCount = likeCount;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    public List<byte[]> getPostImages() {
        return postImages;
    }

    public void setPostImages(List<byte[]> postImages) {
        this.postImages = postImages;
    }

    public List<byte[]> getPostVideos() {
        return postVideos;
    }

    public void setPostVideos(List<byte[]> postVideos) {
        this.postVideos = postVideos;
    }

    public List<PostComment> getComments() {
        return comments;
    }

    public void setComments(List<PostComment> comments) {
        this.comments = comments;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
}
