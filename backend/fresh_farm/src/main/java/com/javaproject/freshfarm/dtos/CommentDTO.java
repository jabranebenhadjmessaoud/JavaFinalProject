package com.javaproject.freshfarm.dtos;

import java.util.Date;

import com.javaproject.freshfarm.models.Post;
import com.javaproject.freshfarm.models.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
	
	
private Long id;
	
    private String comment;
    
    private UserDTO postCommentedBy;
    
    private PostDTO postsComments;  

    private Date createdAt;


}
