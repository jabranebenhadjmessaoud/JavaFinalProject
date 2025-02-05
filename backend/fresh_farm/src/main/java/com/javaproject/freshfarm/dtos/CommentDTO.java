package com.javaproject.freshfarm.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
	
	
private Long id;
	
    private String comment;


    private Date createdAt;


}
