package com.javaproject.freshfarm.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.ProductDTO;
import com.javaproject.freshfarm.models.Product;
import com.javaproject.freshfarm.repositories.ProductRepository;
import com.javaproject.freshfarm.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
	private final ModelMapper modelMapper ;
	private final ProductRepository productRepository ;
	private final UserRepository userRepository;
	private final JwtService jwtService ;
	
	
		public ProductDTO createProduct(Product post){
		        Product newProduct = productRepository.save(post);
	
		        return convertEntityToDto(newProduct);
		    }

	
		public List<ProductDTO> getAllProductsDTO(){   
	        return productRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
	    }
		
		public ProductDTO getProductByIdDTO(Long id){
		        return convertEntityToDto(productRepository.findById(id).get());
		    }
	
		public ProductDTO updateProduct(Long id, Product product){
	        Optional<Product> optionalProduct = productRepository.findById(id);
	        if (optionalProduct.isPresent()){
	            Product oldProduct = optionalProduct.get();
	            if (product.getProduct_title() != null){
	            	oldProduct.setProduct_title(product.getProduct_title());;
	            }
	            if (product.getDescription() != null){
	            	oldProduct.setDescription(product.getDescription());
	            }
	            if (product.getPrice() != null){
	            	oldProduct.setPrice(product.getPrice());
	            }
	            if (product.getCategory() != null){
	            	oldProduct.setCategory(product.getCategory());
	            }
	            if (product.getLocation() != null){
	            	oldProduct.setLocation(product.getLocation());
	            }
	            if (product.getFarming_method() != null){
	            	oldProduct.setFarming_method(product.getFarming_method());
	            }
	           
	            return convertEntityToDto(productRepository.save(oldProduct));

	        }else {
	            return null;
	        }
	    }
	
	
	
	
	
		public ProductDTO convertEntityToDto(Product product) {
	        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
	        return modelMapper.map(product, ProductDTO.class);
	    }

	    public Product convertDtoToEntity(ProductDTO productDTO) {
	        return modelMapper.map(productDTO, Product.class);
	    }
	

}
