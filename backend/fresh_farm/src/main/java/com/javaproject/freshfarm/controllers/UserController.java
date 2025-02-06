package com.javaproject.freshfarm.controllers;

import java.util.List;
import java.util.Optional;

import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.javaproject.freshfarm.dtos.UserDTO;
import com.javaproject.freshfarm.models.Role;
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
    public List<UserDTO> getAllUsersDTO() {
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

    @PutMapping("/admin/ban/{id}")
    public ResponseEntity<UserDTO> banFarmer(@PathVariable("id") Long id) {
        UserDTO user1=userService.getUserById(id);
        user1.setUser_stat("BANNED");
        userService.updateUserStatusBan(user1);
        return ResponseEntity.ok(user1);    
    }

    //@GetMapping("/admin/unban/{id}")
    //public ResponseEntity<User> unbanFarmer(@PathVariable("id") Long id) {
     //   Optional<User> user1=userRepository.findById(id);
     //   user1.setStatus("ACTIVE");
       // return ResponseEntity.ok(user1);
    }
    
    

