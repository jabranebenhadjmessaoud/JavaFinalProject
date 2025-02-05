package com.javaproject.freshfarm.auth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.UserRepository;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    /**
     * This service class handles the business logic for user authentication and registration.
     */
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user. If the email already exists, returns a CONFLICT status.
     * Otherwise, generates an auto-generated password, saves the new user and email him containing his details, and
     * returns an authentication response with a JWT token and user role.
     *
     * @param request containing user details
     * @return ResponseEntity containing the authentication response and HTTP status
     */
    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) {
        var opUser = userRepository.findByEmail(request.getEmail());
        if (opUser.isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {




            var user = User.builder()
                    .fullName(request.getFullName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
//  Pass the PASSWORD instead of autogenerate
// .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole()).image_url(request.getImage_url())
                    .build();
            userRepository.save(user);
            var jwtToken = jwtService.generateToken(user, user.getId());
            var role = user.getRole();
            var fullName = user.getFullName();
            var email = user.getEmail();
            var image_url = user.getImage_url();
            //Added user id when you register
            var id = user.getId();
            return new ResponseEntity<>(AuthenticationResponse.builder().role(role)
                    .fullName(fullName).id(id).image_url(image_url)
                    .email(email).token(jwtToken).build(), HttpStatus.OK);
        }
    }

    /**
     * Authenticates a user with the provided email and password. If authentication is
     * successful, retrieves the user details, generates a JWT token, and returns
     * an authentication response with the user's role and the token.
     *
     * @param request containing email and password
     * @return AuthenticationResponse containing the user's role and JWT token
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user, user.getId());
        var role = user.getRole();
        var fullName = user.getFullName();
        var email = user.getEmail();
        //Added user id when you login
        var id = user.getId();
        return AuthenticationResponse.builder().role(role)
                .fullName(fullName)
                .id(id)
                .image_url(user.getImage_url())
                .email(email).token(jwtToken).build();
    }



}
