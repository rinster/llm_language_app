package com.teamEleven.backend.service;

import com.teamEleven.backend.dtos.AuthResponse;
import com.teamEleven.backend.dtos.LoginRequest;
import com.teamEleven.backend.dtos.RegisterUserRequest;
import com.teamEleven.backend.dtos.UserDto;
import com.teamEleven.backend.entities.User;
import com.teamEleven.backend.mappers.UserMapper;
import com.teamEleven.backend.respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    public AuthResponse register(RegisterUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        User user = userMapper.toEntity(request);
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);
        
        UserDto userDto = userMapper.toDto(user);
        String token = jwtService.generateToken(user);
        
        return new AuthResponse(token, userDto);
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        
        UserDto userDto = userMapper.toDto(user);
        String token = jwtService.generateToken(user);
        
        return new AuthResponse(token, userDto);
    }
}

