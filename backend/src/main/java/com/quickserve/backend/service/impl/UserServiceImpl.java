package com.quickserve.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickserve.backend.dto.LoginRequest;
import com.quickserve.backend.dto.LoginResponse;
import com.quickserve.backend.dto.MessageResponse;
import com.quickserve.backend.dto.RegisterRequest;
import com.quickserve.backend.model.User;
import com.quickserve.backend.repository.UserRepository;
import com.quickserve.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public MessageResponse register(RegisterRequest req) {

        if (repository.existsByEmail(req.getEmail())) {
            return new MessageResponse("Email already exists!");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // (optional: hash later)
        user.setRole(req.getRole());

        repository.save(user);

        return new MessageResponse("Registration Successful!");
    }

    @Override
    public LoginResponse login(LoginRequest req) {

        User user = repository.findByEmail(req.getEmail());

        if (user == null) {
            throw new RuntimeException("Email not registered");
        }

        if (!user.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Incorrect Password");
        }

        return new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

    }
}
