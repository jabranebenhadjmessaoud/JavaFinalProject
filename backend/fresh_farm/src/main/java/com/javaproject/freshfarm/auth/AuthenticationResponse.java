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
public class AuthenticationResponse {

    /**
     * Represents the response returned after successful authentication.
     * Contains a JWT token and the user's role, fullName and email.
     */
	private Long id;
    private String token;
    private String fullName;
    private String email;
    private Role role;
}
