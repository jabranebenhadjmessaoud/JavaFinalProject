package com.javaproject.freshfarm.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.dtos.OrderProductDTO;
import com.javaproject.freshfarm.dtos.ProductDTO;
import com.javaproject.freshfarm.models.OrderProduct;
import com.javaproject.freshfarm.models.Product;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.OrderProductsRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderProductController {
	 @Autowired
	    private OrderProductsRepository orderProductsRepository;
	    
	 @GetMapping("order/{id}")
	    public List<OrderProductDTO> getOneOrder(@PathVariable("id") Long id) {
	        List<OrderProduct> orderProducts = orderProductsRepository.getorderWhereId(id);
	        return orderProducts.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	    }
	    
	    private OrderProductDTO convertToDTO(OrderProduct orderProduct) {
	        OrderProductDTO dto = new OrderProductDTO();
	        dto.setId(orderProduct.getId());
	        
	        // Set product information
	        Product product = orderProduct.getProduct();
	        dto.setProductId(product.getId());
	        dto.setProductTitle(product.getProduct_title());
	        dto.setPrice(product.getPrice());
	        dto.setQuantity(orderProduct.getQuantity());
	        
	        // Set product DTO
	        dto.setProduct(convertToProductDTO(product));
	        
	        // Set user information
	        User orderedBy = orderProduct.getOrder().getOrderedBy();
	        OrderProductDTO.OrderUserInfo userInfo = new OrderProductDTO.OrderUserInfo();
	        userInfo.setId(orderedBy.getId());
	        userInfo.setFullName(orderedBy.getFullName());
	        userInfo.setEmail(orderedBy.getEmail());
	        dto.setOrderedBy(userInfo);
	        
	        return dto;
	    }
	    
	    private ProductDTO convertToProductDTO(Product product) {
	        ProductDTO productDTO = new ProductDTO();
	        productDTO.setId(product.getId());
	        productDTO.setProduct_title(product.getProduct_title());
	        productDTO.setCategory(product.getCategory());
	        productDTO.setFarming_method(product.getFarming_method());
	        productDTO.setLocation(product.getLocation());
	        productDTO.setPrice(product.getPrice());
	        productDTO.setQuantity(product.getQuantity());
	        productDTO.setDescription(product.getDescription());
	        productDTO.setImage_url(product.getImage_url());
	        
	        return productDTO;
	    }
	}