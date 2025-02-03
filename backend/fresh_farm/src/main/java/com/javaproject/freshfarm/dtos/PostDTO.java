package com.javaproject.freshfarm.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {

	
	private Long id;
	
    private String post_title;

    private String description;

    private Date createdAt;

}
