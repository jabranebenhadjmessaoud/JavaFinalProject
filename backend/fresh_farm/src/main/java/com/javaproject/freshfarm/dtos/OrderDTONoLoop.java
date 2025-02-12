package com.javaproject.freshfarm.dtos;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTONoLoop {

	private Long id;
    private String order_stat;
    private Double amount;
    private Date createdAt;
    private Date updatedAt;
    private UserDTO orderedBy;
	
	
}
