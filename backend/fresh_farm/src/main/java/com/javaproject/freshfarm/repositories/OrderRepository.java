package com.javaproject.freshfarm.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.freshfarm.dtos.OrderDTO;
import com.javaproject.freshfarm.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	Optional <Order> findById(Long id);
	
}
