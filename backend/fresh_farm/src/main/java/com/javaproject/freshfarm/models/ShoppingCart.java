package com.javaproject.freshfarm.models;

import java.util.List;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Table(name="shoppingcarts")
public class ShoppingCart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="usercart_id")
	private List <User> userCart;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="productcart_id")
	private List <Product> productsadded;

}
