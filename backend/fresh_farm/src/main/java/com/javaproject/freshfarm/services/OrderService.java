package com.javaproject.freshfarm.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.OrderDTO;
import com.javaproject.freshfarm.dtos.OrderDTONoLoop;
import com.javaproject.freshfarm.dtos.UserDTO;
import com.javaproject.freshfarm.models.Order;
import com.javaproject.freshfarm.models.OrderProduct;
import com.javaproject.freshfarm.models.Product;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.OrderRepository;
import com.javaproject.freshfarm.repositories.ProductRepository;
import com.javaproject.freshfarm.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final ModelMapper modelMapper;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public List<OrderDTO> getAllOrdersDTO() {
        return orderRepository.findAll()
            .stream()
            .map(this::convertEntityToDto)
            .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO createOrder(Order order) {
        // Create new order with fresh OrderProducts list
        Order newOrder = new Order();
        newOrder.setOrderedBy(order.getOrderedBy());
        newOrder.setOrder_stat("PENDING");
        newOrder.setOrderProducts(new ArrayList<>());
        
        double totalAmount = 0.0;

        // Process each order product
        for (OrderProduct orderProduct : order.getOrderProducts()) {
            // Get product from database using the product ID
            Product product = productRepository.findById(orderProduct.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + 
                    orderProduct.getProduct().getId()));
            
            // Validate quantity
            if (product.getQuantity() < orderProduct.getQuantity()) {
                throw new RuntimeException("Insufficient quantity for product: " + 
                    product.getProduct_title() + ". Available: " + product.getQuantity());
            }
            
            // Update product quantity
            product.setQuantity(product.getQuantity() - orderProduct.getQuantity());
            productRepository.save(product);
            
            // Create new OrderProduct with proper relationships
            OrderProduct newOrderProduct = new OrderProduct();
            newOrderProduct.setOrder(newOrder);
            newOrderProduct.setProduct(product);
            newOrderProduct.setQuantity(orderProduct.getQuantity());
            
            // Add to order
            newOrder.getOrderProducts().add(newOrderProduct);
            
            // Calculate amount
            totalAmount += product.getPrice() * orderProduct.getQuantity();
        }
        
        // Set final amount
        newOrder.setAmount(totalAmount);
        
        // Save and return
        Order savedOrder = orderRepository.save(newOrder);
        return convertEntityToDto(savedOrder);
    }

    public OrderDTO convertEntityToDto(Order order) {
        modelMapper.getConfiguration()
            .setMatchingStrategy(MatchingStrategies.LOOSE);
        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        
        // Ensure proper mapping of nested objects
        if (orderDTO.getOrderProducts() != null) {
            orderDTO.getOrderProducts().forEach(op -> {
                if (op.getProduct() != null) {
                    op.setProductId(op.getProduct().getId());
                    op.setProductTitle(op.getProduct().getProduct_title());
                    op.setPrice(op.getProduct().getPrice());
                }
            });
        }
        
        return orderDTO;
    }

    public Order convertDtoToEntity(OrderDTO orderDTO) {
        return modelMapper.map(orderDTO, Order.class);
    }

	public Optional<Order> getOrderById(Long id) {
		// TODO Auto-generated method stub
		
		return orderRepository.findById(id); 
	}

	public List<OrderDTO> getUserOrders(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	public List<OrderDTONoLoop> getAllOrders() {
	    return orderRepository.findAll().stream()
	            .map(this::convertToOrderDTONoLoop)
	            .collect(Collectors.toList());
	}

	private OrderDTONoLoop convertToOrderDTONoLoop(Order order) {
	    return OrderDTONoLoop.builder()
	            .id(order.getId())
	            .order_stat(order.getOrder_stat())
	            .amount(order.getAmount())
	            .createdAt(order.getCreatedAt())
	            .updatedAt(order.getUpdatedAt())
	            .orderedBy(convertToUserDTO(order.getOrderedBy()))
	            .build();
	}

	private UserDTO convertToUserDTO(User orderedBy) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public void setToDelivering(Long id) {
		Order theOrder=orderRepository.findById(id).get();
		theOrder.setOrder_stat("ON_Delivery");
		orderRepository.save(theOrder);
		}
	public void setToDeliverd(Long id) {
		Order theOrder=orderRepository.findById(id).get();
		theOrder.setOrder_stat("Delivered");
		orderRepository.save(theOrder);
		}
	
	
	
	
	
	
	
}