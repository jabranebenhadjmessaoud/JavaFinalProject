package com.javaproject.freshfarm.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Builder.Default
	private String order_stat = "PENDING";
	
	
	private Double amount;
	
	@ToString.Exclude
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User orderedBy;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<OrderProduct> orderProducts;

	
	public void addProduct(Product product, Integer quantity) {
	    OrderProduct orderProduct = new OrderProduct();
	    orderProduct.setOrder(this);
	    orderProduct.setProduct(product);
	    orderProduct.setQuantity(quantity);
	    
	    if (orderProducts == null) {
	        orderProducts = new ArrayList<>();
	    }
	    orderProducts.add(orderProduct);
	}    
	

	
	
	
	
	@Column(updatable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;

	/**
	 * Sets the createdAt field to the current date before persisting the entity.
	 */
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	/**
	 * Sets the updatedAt field to the current date before updating the entity.
	 */
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

}
