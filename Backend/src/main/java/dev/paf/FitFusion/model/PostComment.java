package dev.paf.FitFusion.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
public class PostComment {

    @Id
    private String id;

    private String postId; // ID of the post this comment belongs to
    private String userId;
    private String text;

    public PostComment(String postId, String userId, String text) {
        this.postId = postId;
        this.userId = userId;
        this.text = text;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
