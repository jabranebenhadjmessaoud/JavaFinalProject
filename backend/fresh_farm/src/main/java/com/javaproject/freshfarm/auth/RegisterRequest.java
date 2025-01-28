package com.javaproject.freshfarm.auth;

import com.javaproject.freshfarm.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    /**
     * Data Transfer Object (DTO) for handling user registration requests.
     * Contains the necessary information for creating a new user, including
     * full name, email, password, and role.
     */
    private String fullName;
    private String email;
    private String password;
    private Role role;
}
