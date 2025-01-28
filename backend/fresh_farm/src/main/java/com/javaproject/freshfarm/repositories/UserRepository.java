package com.javaproject.freshfarm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaproject.freshfarm.models.Role;
import com.javaproject.freshfarm.models.User;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for performing CRUD operations on User entities.
 * Extends JpaRepository to provide standard data access methods.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their email.
     *
     * @param email the email of the user
     * @return an Optional containing the user if found, otherwise empty
     */
    Optional<User> findByEmail(String email);

    /**
     * Finds all users with a given role.
     *
     * @param role the role of the users
     * @return a list of users with the specified role
     */
    List<User> findByRole(Role role);
}
