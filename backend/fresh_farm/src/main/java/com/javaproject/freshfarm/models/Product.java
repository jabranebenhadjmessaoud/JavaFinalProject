package com.javaproject.freshfarm.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="products")
public class Product {

	
	
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message = "Title is required!")
	private String product_title;
	
	@NotEmpty(message = "Category is required!")
	private String category;
	
	private String farming_method;
	
	@NotEmpty(message = "Location is required!")
	private String location;
	
	@Min(value=0,message="min shoule be")
	private Double price;
	
	@Min(value=0,message="min shoule be")
	private Integer quantity;
	
	@NotEmpty(message = "Description is required!")
	private String description;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User postedBy;
	
	@OneToMany(mappedBy = "productcart_id", fetch = FetchType.LAZY)
	private List<ShoppingCart> shoppingCart;
	
	
	
	@Column(updatable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;
	
	@PrePersist
	protected void onCreate() {
	    this.createdAt = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
	    this.updatedAt = new Date();
	}	
	
	
	
	
}
