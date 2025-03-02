package com.javaproject.freshfarm.dtos;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

	
	private Long id;
    private String order_stat;
    private Double amount;
    private List<OrderProductDTO> orderProducts;
    private Date createdAt;
    private Date updatedAt;
    private UserDTO orderedBy;

	
	
}
