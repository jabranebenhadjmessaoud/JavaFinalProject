package com.javaproject.freshfarm.config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration class for setting up security-related settings in the application.
 * Configures security filter chain to define access rules, session management, and authentication.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    /**
     * Configures security filter chain with custom settings.
     *
     * @param http HttpSecurity object used to configure security settings
     * @return SecurityFilterChain with custom security configuration
     * @throws Exception if there is an error during configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf()
                .disable() // Disables CSRF protection as it's not needed for stateless APIs
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/**")
                .permitAll() // Allows unrestricted access to authentication endpoints
                .requestMatchers("/api/v1/**")
                .permitAll()
                .requestMatchers("/api/v1/farmer/allproducts")
                .permitAll()
                .requestMatchers("/api/v1/farmer/posts/**")
                .hasAnyRole("FARMER")
                .requestMatchers("/api/v1/farmer/**")
                .hasAnyRole("FARMER","")
                .anyRequest()
                .authenticated() // Requires authentication for all other requests
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Configures session management to stateless for API security
                .and()
                .authenticationProvider(authenticationProvider) // Sets the custom authentication provider
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Adds JWT filter before the default username/password authentication filter
        return http.build();
    }
}
