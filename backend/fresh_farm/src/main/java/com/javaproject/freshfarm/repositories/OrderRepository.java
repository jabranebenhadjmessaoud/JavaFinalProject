package com.javaproject.freshfarm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.freshfarm.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	

}
