package com.javaproject.freshfarm.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.PostDTO;
import com.javaproject.freshfarm.dtos.ProductDTO;
import com.javaproject.freshfarm.models.Post;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.UserRepository;
import com.javaproject.freshfarm.services.PostService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/farmer/posts")
@RequiredArgsConstructor

public class PostController {
	
	
	private final PostService postService;
	private final UserRepository userRepository;
    private final JwtService jwtService;
    
    @GetMapping("/allposts")
    public List<PostDTO>getAllPosts(){
    	return postService.getAllPostsDTO();
    }
    
    @PostMapping("/newpost")
    public PostDTO createPost(@RequestBody Post post,
    							HttpServletRequest request
    							){    
        // Extract token from Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            if (userRepository.findById(userId).isPresent()) {
                User user = userRepository.findById(userId).get();
                post.setPostUploadedBy(user);
                return postService.createPost(post);
            }
            throw new RuntimeException("User not found");
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }
    
    @GetMapping("/showpost/{id}")
    public PostDTO getOnePost(@PathVariable("id") Long id){
        return postService.getPostByIdDTO(id);
    }
    
    

}
