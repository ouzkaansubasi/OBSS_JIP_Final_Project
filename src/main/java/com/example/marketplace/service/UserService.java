package com.example.marketplace.service;

import com.example.marketplace.dto.UserDTO;

import java.util.Optional;

public interface UserService {
    UserDTO getUserById(Long id);
}
