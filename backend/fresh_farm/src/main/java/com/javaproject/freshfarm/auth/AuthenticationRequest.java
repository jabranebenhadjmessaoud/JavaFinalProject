package com.javaproject.freshfarm.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    /**
     * A data transfer object (DTO) representing an authentication request.
     * Contains the user's email and password.
     */

    private String email;
    private String password;
}
