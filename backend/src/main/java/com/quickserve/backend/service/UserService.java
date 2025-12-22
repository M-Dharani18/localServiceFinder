package com.quickserve.backend.service;

import com.quickserve.backend.dto.LoginRequest;
import com.quickserve.backend.dto.LoginResponse;
import com.quickserve.backend.dto.MessageResponse;
import com.quickserve.backend.dto.RegisterRequest;

public interface UserService {

    MessageResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}
