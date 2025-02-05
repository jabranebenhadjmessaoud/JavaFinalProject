package com.javaproject.freshfarm.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.CommentDTO;
import com.javaproject.freshfarm.models.Comment;
import com.javaproject.freshfarm.models.Post;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.PostRepository;
import com.javaproject.freshfarm.repositories.UserRepository;
import com.javaproject.freshfarm.services.CommentService;
import com.javaproject.freshfarm.services.PostService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/farmer/posts")
@RequiredArgsConstructor
public class CommentController {
	
	
	
	private final CommentService commentService;
	private final UserRepository userRepository;
	private final PostRepository postRepository;
	private final PostService postService;
    private final JwtService jwtService;
	
	// getting one post comments :
	@GetMapping("/comments/{id}")
	public List<CommentDTO> getOnePostComments(@PathVariable("id") Long id) {
		return commentService.getOnePostCommentsDTO(id);   
	}
	
	@GetMapping("/allcomments")
	public List<CommentDTO> getallComments() {
		return commentService.getAllCommentsDTO();   
	}
	
	
	
	@PostMapping("/newcomment/{post_id}")
    public CommentDTO createComment(@RequestBody Comment comment,
    							HttpServletRequest request,
    							@PathVariable("post_id") Long post_id
    							){    
        // Extract token from Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            if (userRepository.findById(userId).isPresent()) {
                User user = userRepository.findById(userId).get();
                comment.setPostCommentedBy(user);
              if(postRepository.findPostById(post_id).isPresent()) {
            	  Post post=postRepository.findPostById(post_id).get();
            	  comment.setPostsComments(post);
              }
                return commentService.createComment(comment);
            }
            throw new RuntimeException("User not found");
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }
    
	
	

}
