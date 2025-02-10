package com.javaproject.freshfarm.dtos;

import java.util.Date;
import java.util.List;

import com.javaproject.freshfarm.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserNoOrderDTO {

	
	
	 	private Long id;
	    private String fullName;
	    private String email;
	    private String image_url;
	    private String user_stat;
	    //private List<ProductDTO> createdProducts;
		//private List<PostDTO> createdPosts;
		private List<ProductDTO> addedprodectstocart;
		
		
		private Date createdAt;

	    private Role role;
}
