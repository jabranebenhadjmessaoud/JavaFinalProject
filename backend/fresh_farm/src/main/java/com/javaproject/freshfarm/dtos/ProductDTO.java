package com.javaproject.freshfarm.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

	private Long id;
	
    private String product_title;
    
    private String category;
    
    private String farming_method;
    
    private String location;
    
    private Double price;
    
    private String description;


}
