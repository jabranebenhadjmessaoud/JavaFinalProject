package com.javaproject.freshfarm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaproject.freshfarm.models.Comment;
import com.javaproject.freshfarm.models.Post;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	List <Comment> findAll();
	
	@Query(value="SELECT * FROM comments WHERE post_id = ?1", nativeQuery=true)
    List<Comment> getCommentsByPostId(Long id);
	
	


	
	
}
