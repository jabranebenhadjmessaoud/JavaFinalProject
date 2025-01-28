package com.javaproject.freshfarm.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * Filter that processes JWT tokens from incoming HTTP requests.
     * This filter checks for the presence of a JWT token in the Authorization header,
     * validates the token, and sets the authentication in the security context if valid.
     */
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    /**
     * Filters incoming HTTP requests to extract and validate JWT tokens.
     * If a valid token is found, sets the authentication in the security context.
     *
     * @param request     the incoming HTTP request
     * @param response    the outgoing HTTP response
     * @param filterChain the filter chain for further processing
     * @throws ServletException if a servlet-specific exception occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        // Check if the Authorization header is present and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        // Extract the JWT token from the header
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        // If the user email is valid and no authentication is currently set
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from the email
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            // Validate the JWT token
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Create authentication token with user details and set it in the security context
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        // Proceed with the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
