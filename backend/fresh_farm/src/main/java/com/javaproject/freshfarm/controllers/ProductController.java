package com.javaproject.freshfarm.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.ProductDTO;
import com.javaproject.freshfarm.models.Product;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.UserRepository;
import com.javaproject.freshfarm.services.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/farmer")
@RequiredArgsConstructor
public class ProductController {
	
	
	
	private final ProductService productService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/allproducts")
    public List<ProductDTO> getAllProductsDTO(){
        return productService.getAllProductsDTO();
    }
    
    
    @PostMapping("/newproduct")
    public ProductDTO createProduct(@RequestBody Product product,
    							HttpServletRequest request
    							){    
        // Extract token from Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            if (userRepository.findById(userId).isPresent()) {
                User user = userRepository.findById(userId).get();
                product.setPostedBy(user);
                return productService.createProduct(product);
            }
            throw new RuntimeException("User not found");
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }
    
    
    @GetMapping("/showproduct/{id}")
    public ProductDTO getOnePost(@PathVariable("id") Long id){
        return productService.getProductByIdDTO(id);
    }
    
    
    
    
}
