package com.javaproject.freshfarm.dtos;

import java.util.Date;
import java.util.List;

import com.javaproject.freshfarm.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserSimpleDTO {

	private Long id;
    private String fullName;
    private String email;
    private String password;
    private String image_url;
    private String user_stat;
    private Date createdAt;

    private Role role;
}
