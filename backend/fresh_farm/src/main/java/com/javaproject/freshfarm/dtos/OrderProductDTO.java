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
	    
	    private OrderUserInfo orderedBy;
	    
	    @Data
	    public static class OrderUserInfo {
	        private Long id;
	        private String fullName;
	        private String email;
	    }
	
}
