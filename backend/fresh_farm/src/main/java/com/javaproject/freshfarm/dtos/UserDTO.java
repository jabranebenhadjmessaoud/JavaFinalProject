package com.javaproject.freshfarm.dtos;

import java.util.Date;
import java.util.List;

import com.javaproject.freshfarm.models.Post;
import com.javaproject.freshfarm.models.Product;
import com.javaproject.freshfarm.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for transferring user information.
 *
 * This class represents a user with fields for ID, full name, email, and role.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String fullName;
    private String email;
    private List<ProductDTO> createdProducts;
	private List<PostDTO> createdPosts;
	private List<ProductDTO> addedprodectstocart;
	
	private Date createdAt;

    private Role role;
}
