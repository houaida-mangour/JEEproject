package com.mycompany.obitemservice.controller.auth;

import com.mycompany.obitemservice.config.JwtService;
import com.mycompany.obitemservice.controller.User.Role;
import com.mycompany.obitemservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.mycompany.obitemservice.controller.User.user;



@Service
@RequiredArgsConstructor
public class authenticationService {

    private final UserRepository  repository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    public AuthenticationResponse register(RegisterRequest request) {
        var user1=user.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user1);
        var jwtToken = jwtService.generateToken(user1);
        return AuthenticationResponse.builder()
                .Token(jwtToken)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        var user1 = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user1);
        return AuthenticationResponse.builder()
                .Token(jwtToken)
                .build();
    }
}
