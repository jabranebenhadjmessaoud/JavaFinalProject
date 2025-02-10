package com.javaproject.freshfarm.dtos;


import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    
    private Integer quantity;

    private String image_url;

    private String description;
    
   

    private Date createdAt;
	private Date updatedAt;


}
