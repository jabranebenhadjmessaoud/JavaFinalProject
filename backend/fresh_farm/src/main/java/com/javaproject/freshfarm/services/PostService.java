package com.javaproject.freshfarm.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.PostDTO;
import com.javaproject.freshfarm.dtos.ProductDTO;
import com.javaproject.freshfarm.models.Post;
import com.javaproject.freshfarm.models.Product;
import com.javaproject.freshfarm.repositories.PostRepository;
import com.javaproject.freshfarm.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	
	private final ModelMapper modelMapper ;
	private final PostRepository postRepository ;
	private final UserRepository userRepository;
	private final JwtService jwtService ;
	
	public PostDTO createPost(Post post) {
		Post newPost=postRepository.save(post);
		return convertEntityToDto(newPost);
	}    
	
	public List<PostDTO> getAllPostsDTO(){   
        return postRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
    }
	
	public PostDTO getPostByIdDTO(Long id){
        return convertEntityToDto(postRepository.findById(id).get());
    }
	
	
	
	
	
	public PostDTO updatePost(Long id, Post post){
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()){
        	Post oldPost = optionalPost.get();
            if (post.getPost_title() != null){
            	oldPost.setPost_title(post.getPost_title());;
            }
            if (post.getDescription() != null){
            	oldPost.setDescription(post.getDescription());
            }
            
            return convertEntityToDto(postRepository.save(oldPost));

        }else {
            return null;    
        }
    }
	
	
	
	
	
	
	
	
	public PostDTO convertEntityToDto(Post post) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(post, PostDTO.class);
    }

    public Post convertDtoToEntity(PostDTO postDTO) {
        return modelMapper.map(postDTO, Post.class);
    }

	
	
}
