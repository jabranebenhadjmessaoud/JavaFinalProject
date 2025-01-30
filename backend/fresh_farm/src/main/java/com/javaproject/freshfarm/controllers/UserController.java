package com.javaproject.freshfarm.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaproject.freshfarm.dtos.UserDTO;
import com.javaproject.freshfarm.models.Role;
import com.javaproject.freshfarm.services.UserService;

import java.util.List;

/**
 * Controller for handling user-related requests for the admin API.
 * Provides endpoints to retrieve user information.
 */
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

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
}
