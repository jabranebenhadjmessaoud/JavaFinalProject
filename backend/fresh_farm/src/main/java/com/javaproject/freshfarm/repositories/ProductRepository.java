package com.javaproject.freshfarm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.freshfarm.models.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
		
	List <Product> findAll();
	



}
