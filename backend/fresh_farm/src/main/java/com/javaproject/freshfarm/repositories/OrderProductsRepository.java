package com.javaproject.freshfarm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaproject.freshfarm.models.OrderProduct;


public interface OrderProductsRepository extends JpaRepository<OrderProduct, Long> {
	
	 @Query(value="SELECT * FROM freshfarm.order_products where order_id=?1",nativeQuery =true)
	  List<OrderProduct> getorderWhereId(Long id);
}
