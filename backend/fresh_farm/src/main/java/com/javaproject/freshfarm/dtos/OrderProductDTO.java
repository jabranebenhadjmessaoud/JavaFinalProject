package com.javaproject.freshfarm.dtos;

import lombok.Data;

@Data
public class OrderProductDTO {

		private Long id;
	    private Long productId;
	    private String productTitle;
	    private Double price;
	    private Integer quantity;
	    private ProductDTO product;
	
}
