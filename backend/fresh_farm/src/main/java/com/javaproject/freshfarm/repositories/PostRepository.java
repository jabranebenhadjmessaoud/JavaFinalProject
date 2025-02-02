package com.javaproject.freshfarm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.freshfarm.models.Post;


public interface PostRepository extends JpaRepository<Post, Long>{

	List <Post> findAll();
}
