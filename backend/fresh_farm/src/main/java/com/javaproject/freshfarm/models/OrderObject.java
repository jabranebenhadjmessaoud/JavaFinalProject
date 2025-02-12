package com.javaproject.freshfarm.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderObject {
	
	private List<OrderProduct> orderProducts;
	private Double amount; 
	
}
