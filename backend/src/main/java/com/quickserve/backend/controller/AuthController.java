package com.quickserve.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.quickserve.backend.dto.LoginRequest;
import com.quickserve.backend.dto.LoginResponse;
import com.quickserve.backend.dto.MessageResponse;
import com.quickserve.backend.dto.RegisterRequest;
import com.quickserve.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public MessageResponse register(@RequestBody RegisterRequest req) {
        return userService.register(req);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return userService.login(req);
    }
}
