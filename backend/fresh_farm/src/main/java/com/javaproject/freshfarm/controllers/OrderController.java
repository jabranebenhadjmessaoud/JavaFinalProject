package com.javaproject.freshfarm.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.OrderDTO;
import com.javaproject.freshfarm.dtos.ProductDTO;
import com.javaproject.freshfarm.models.Order;
import com.javaproject.freshfarm.models.Product;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.UserRepository;
import com.javaproject.freshfarm.services.OrderService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
	
	private final UserRepository userRepository;
	private final OrderService orderService;
    private final JwtService jwtService;

	
	
	
	@GetMapping("/all")
	public List<OrderDTO> getAllOrders(){
		return orderService.getAllOrdersDTO();
	}
	
	
	 @PostMapping("/neworder")
	    public OrderDTO createOrder(@RequestBody Order order,
	    							HttpServletRequest request
	    							){    
	        // Extract token from Authorization header
	        String authHeader = request.getHeader("Authorization");
	        if (authHeader != null && authHeader.startsWith("Bearer ")) {
	            String token = authHeader.substring(7);
	            Long userId = jwtService.extractUserId(token);
	            if (userRepository.findById(userId).isPresent()) {
	                User user = userRepository.findById(userId).get();
	                System.out.println(user.getFullName());
	                

	                order.setOrderedBy(user);
	                System.out.println(order.getAmount());
	                System.out.println(order.getOrderedBy().getFullName());
	                return orderService.createOrder(order);
	            }
	            throw new RuntimeException("User not found");
	        }
	        throw new RuntimeException("Authorization header is missing or invalid");
	    }
	    
	

}
