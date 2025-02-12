package com.javaproject.freshfarm.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.dtos.UserDTO;
import com.javaproject.freshfarm.dtos.UserNoOrderDTO;
import com.javaproject.freshfarm.models.Role;
import com.javaproject.freshfarm.repositories.UserRepository;
import com.javaproject.freshfarm.services.UserService;

import lombok.RequiredArgsConstructor;


/**
 * Controller for handling user-related requests for the admin API.
 * Provides endpoints to retrieve user information.
 */
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
	

    private final UserService userService;
    private final UserRepository userRepository;

    /**
     * Endpoint to retrieve all users.
     *
     * @return List of UserDTO containing details of all users
     */
    @GetMapping("/admin/allusers")
    public List<UserNoOrderDTO> getAllUsersDTO() {
        return userService.getAllUsers();
    }
    
    
    

    /**
     * Endpoint to retrieve users filtered by their role.
     *
     * @param role the role to filter users by
     * @return List of UserDTO containing details of users with the specified role
     */
    @GetMapping("/any/user/role/{role}")
    public List<UserDTO> getUsersByRole(@PathVariable("role") Role role) {
        return userService.getUsersByRole(role);
    }
    
    
    @GetMapping("/user/showprofile/{id}")
    public  ResponseEntity<UserDTO> displayUser(@PathVariable("id")Long id) {  
    	UserDTO user=userService.getUserById(id);
		return ResponseEntity.ok(user) ;      
	}

   // @PutMapping("/admin/banaaacsdcSDvdsvSF/{id}")
   // public ResponseEntity<UserDTO> banFarmer(@PathVariable("id") Long id,
    	//			@RequestBody UserDTO user) {
    //    //UserDTO user1=userService.getUserById(id);
        //user.setUser_stat("BANNED");
     //   userService.updateUserStatusBan(user);
     //   return ResponseEntity.ok(user);    
   // }
    
    
    
    @GetMapping("/admin/ban/{id}")
    public UserDTO banUser(@PathVariable("id") Long id) {
    	System.out.println("before getting user");
    	System.out.println("after getting user and ");
    	
    	UserDTO u=userService.banUser(id);
    	System.out.println("after banning user");
    	return u;
    	
    }
    

    @GetMapping("/admin/unban/{id}")
    public UserDTO unbanUser(@PathVariable("id") Long id) {
    	System.out.println("before getting user");
    	UserDTO u=userService.getUserById(id); 
    	System.out.println(u);
    	System.out.println("after getting user and ");
    	userService.unbanUser(u);
    	System.out.println("after banning user");
    	return u;
    	
    }
    //@GetMapping("/admin/unban/{id}")
    //public ResponseEntity<User> unbanFarmer(@PathVariable("id") Long id) {
     //   Optional<User> user1=userRepository.findById(id);
     //   user1.setStatus("ACTIVE");
       // return ResponseEntity.ok(user1);
    }
    
    

