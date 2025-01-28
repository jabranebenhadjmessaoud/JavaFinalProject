package com.javaproject.freshfarm.auth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class for handling authentication-related requests.
 * Provides endpoints for user registration, authentication, password management, and password reset.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    // The service layer for handling authentication logic
    private final AuthenticationService authenticationService;

    /**
     * Handles user registration requests.
     *
     * @param request the registration request containing user details
     * @return a ResponseEntity containing the result of the registration operation
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    /**
     * Handles user authentication requests.
     *
     * @param request the authentication request containing credentials
     * @return a ResponseEntity containing the authentication result, including the authentication token
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    
}
