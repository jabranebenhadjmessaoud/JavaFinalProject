package com.javaproject.freshfarm.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaproject.freshfarm.models.Post;


public interface PostRepository extends JpaRepository<Post, Long>{

	List <Post> findAll();
	
	@Query("SELECT p FROM Post p WHERE p.id = ?1")
	Optional<Post> findPostById(Long id);
}
