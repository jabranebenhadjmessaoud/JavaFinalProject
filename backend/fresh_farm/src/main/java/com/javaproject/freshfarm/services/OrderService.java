package com.javaproject.freshfarm.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.OrderDTO;
import com.javaproject.freshfarm.models.Order;
import com.javaproject.freshfarm.repositories.OrderRepository;
import com.javaproject.freshfarm.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final ModelMapper modelMapper ;
	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final JwtService jwtService ;
	
	
	public List<OrderDTO> getAllOrdersDTO(){
		return orderRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
	}
	   
	
	public OrderDTO createOrder(Order order) {
		System.out.println(order.getProductsOrdered());
		Order newOrder=orderRepository.save(order);
		return convertEntityToDto(newOrder);
	}
	
	
	
	
	
	
	
	
	public OrderDTO convertEntityToDto(Order order) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(order, OrderDTO.class);
    }

    public Order convertDtoToEntity(OrderDTO oerderDTO) {
        return modelMapper.map(oerderDTO, Order.class);
    }
	

}
