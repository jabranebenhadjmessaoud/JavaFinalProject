package com.javaproject.freshfarm.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.CommentDTO;
import com.javaproject.freshfarm.dtos.PostDTO;
import com.javaproject.freshfarm.models.Comment;
import com.javaproject.freshfarm.models.Post;
import com.javaproject.freshfarm.repositories.CommentRepository;
import com.javaproject.freshfarm.repositories.PostRepository;
import com.javaproject.freshfarm.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	
	private final ModelMapper modelMapper ;
	private final CommentRepository commentRepository ;
	private final PostRepository postRepository ;
	private final UserRepository userRepository;
	private final JwtService jwtService ;
	
	
	
	public List<CommentDTO> getAllCommentsDTO(){   
        return commentRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
    }
	
	public List<CommentDTO> getOnePostCommentsDTO(Long id){   
        return commentRepository.getCommentsByPostId(id).stream().map(this::convertEntityToDto).collect(Collectors.toList());
    }
	
	public CommentDTO createComment(Comment comment) {
		Comment newComment=commentRepository.save(comment);
		return convertEntityToDto(newComment);
	}   
	
	
	
	
	
	
	
	public CommentDTO convertEntityToDto(Comment comment) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(comment, CommentDTO.class);
    }

    public Comment convertDtoToEntity(CommentDTO commentDTO) {
        return modelMapper.map(commentDTO, Comment.class);
    }


}
