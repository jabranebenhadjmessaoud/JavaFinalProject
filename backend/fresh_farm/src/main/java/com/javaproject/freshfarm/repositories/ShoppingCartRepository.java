package com.javaproject.freshfarm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.freshfarm.models.ShoppingCart;

public interface ShoppingCartRepository  extends JpaRepository<ShoppingCart, Long>{

	List <ShoppingCart> findAll();
	
	
	
}
