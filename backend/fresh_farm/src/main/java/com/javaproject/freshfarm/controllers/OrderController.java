package com.javaproject.freshfarm.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.OrderDTO;
import com.javaproject.freshfarm.dtos.OrderDTONoLoop;
import com.javaproject.freshfarm.models.Order;
import com.javaproject.freshfarm.models.OrderObject;
import com.javaproject.freshfarm.models.OrderProduct;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.OrderProductsRepository;
import com.javaproject.freshfarm.repositories.OrderRepository;
import com.javaproject.freshfarm.repositories.ProductRepository;
import com.javaproject.freshfarm.repositories.UserRepository;
import com.javaproject.freshfarm.services.OrderService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
	private final ProductRepository productRepository;
	private final UserRepository userRepository;
	private final OrderRepository orderRepository; 
	private final OrderService orderService;
    private final JwtService jwtService;
    private final OrderProductsRepository orderProductsRepository ;
	
    
    @GetMapping("/order/settodelivering/{id}")
    public void setOrderToDelivering(@PathVariable("id") Long id) {
    	
    	orderService.setToDelivering(id);
  	
    }
    @GetMapping("/order/settodelivered/{id}")
    public void setOrderToDelivered(@PathVariable("id") Long id) {
    	
    	orderService.setToDeliverd(id);
  	
    }
    
	
    
	
    @PostMapping("/neworder")
    public ResponseEntity<?> createOrder(@RequestBody OrderObject orderobj, HttpServletRequest request) {
        try {
            // Validate authorization
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Authorization header is missing or invalid");
            }

            // Extract and validate user
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Validate order object
            if (orderobj.getOrderProducts() == null || orderobj.getOrderProducts().isEmpty()) {
                return ResponseEntity.badRequest().body("Order must contain at least one product");
            }

            // Create base order
            Order order = new Order();
            order.setOrderedBy(user);
            order.setOrder_stat("PENDING");
            order.setOrderProducts(new ArrayList<>());

            // Set up order products
            for (OrderProduct requestProduct : orderobj.getOrderProducts()) {
                if (requestProduct.getProduct() == null || requestProduct.getProduct().getId() == null) {
                    return ResponseEntity.badRequest().body("Invalid product information");
                }
                if (requestProduct.getQuantity() == null || requestProduct.getQuantity() <= 0) {
                    return ResponseEntity.badRequest().body("Invalid quantity for product ID: " + 
                        requestProduct.getProduct().getId());
                }

                // Create order product with base information
                OrderProduct orderProduct = new OrderProduct();
                orderProduct.setOrder(order);
                orderProduct.setQuantity(requestProduct.getQuantity());
                orderProduct.setProduct(requestProduct.getProduct());
                
                order.getOrderProducts().add(orderProduct);
            }

            // Process order through service
            OrderDTO createdOrder = orderService.createOrder(order);
            return ResponseEntity.ok(createdOrder);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()   
                .body("An error occurred while processing your order: " + e.getMessage());
        }
    }

//    @GetMapping("/order/{id}")
//    public ResponseEntity<?> getOrder(@PathVariable Long id, HttpServletRequest request) {
//        try {
//            // Authorization check similar to create order
//            String authHeader = request.getHeader("Authorization");
//            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                return ResponseEntity.badRequest().body("Authorization header is missing or invalid");
//            }
//
//            OrderDTO order = orderService.getOrderById(id);
//            return ResponseEntity.ok(order);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @GetMapping("/orders")
    public ResponseEntity<?> getUserOrders(HttpServletRequest request) {
        try {
            // Authorization check
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Authorization header is missing or invalid");
            }

            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            
            List<OrderDTO> orders = orderService.getUserOrders(userId);
            return ResponseEntity.ok(orders);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    
  // @GetMapping("order/{id}")
   // public List<OrderProduct> getOneOrder(@PathVariable("id") Long id) {
	   //		return orderProductsRepository.getorderWhereId(id);    
   		//}    
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(HttpServletRequest request) {
        try {
            // Authorization check
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Authorization header is missing or invalid");
            }

            // Get all orders through service
            List<OrderDTONoLoop> allOrders = orderService.getAllOrders();
            return ResponseEntity.ok(allOrders);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}
