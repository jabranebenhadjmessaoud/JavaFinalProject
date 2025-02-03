package com.javaproject.freshfarm.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.javaproject.freshfarm.dtos.UserDTO;
import com.javaproject.freshfarm.models.Role;
import com.javaproject.freshfarm.models.User;
import com.javaproject.freshfarm.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    /**
     * Retrieves all users from the repository and maps them to UserDTOs.
     *
     * @return List of UserDTOs representing all users
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    /**
     * Updates an existing user in the repository and returns the updated user as a DTO.
     *
     * @param user The User entity with updated information.
     * @return A UserDTO representing the updated user.
     */
    public UserDTO updateUser(User user) {
        // Save the updated user entity to the repository
        User updatedUser = userRepository.save(user);

        // Convert the updated user entity to a UserDTO and return it
        return convertEntityToDto(updatedUser);
    }


    /**
     * Retrieves users by their role and maps them to UserDTOs.
     *
     * @param role the role to filter users by
     * @return List of UserDTOs representing users with the specified role
     */
    public List<UserDTO> getUsersByRole(Role role) {
        return userRepository.findByRole(role).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
    
    
    public UserDTO getUserById(Long id) {
    	return userRepository.findById(id).map(this::convertEntityToDto) .orElseThrow(() ->new RuntimeException("Doctor not found"));

	}
    
    
    
    
    

    /**
     * Converts a User entity to a UserDTO.
     *
     * @param user the User entity to convert
     * @return the corresponding UserDTO
     */
    public UserDTO convertEntityToDto(User user) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(user, UserDTO.class);
    }

    /**
     * Converts a UserDTO to a User entity.
     *
     * @param userDTO the UserDTO to convert
     * @return the corresponding User entity
     */
    public User convertDtoToEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
