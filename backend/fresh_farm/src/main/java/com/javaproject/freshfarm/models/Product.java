package com.javaproject.freshfarm.models;


import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


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

	@NotEmpty(message = "image is required!")
	private String image_url;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User postedBy;
	

	@OneToMany(mappedBy = "productsReports", fetch = FetchType.LAZY)
	private List<Report> productReports ;
	
	
	@OneToMany(mappedBy = "product")
	private List<OrderProduct> orderProducts;
	
//	@ManyToMany(fetch = FetchType.LAZY)
//	@JoinTable(name = "products_orders",
//	joinColumns = @JoinColumn(name = "product_id"),
//	inverseJoinColumns = @JoinColumn(name = "order_id"))  
//	private List<Order> ordersOfProducts;
	
	
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
