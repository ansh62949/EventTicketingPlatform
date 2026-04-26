package com.example.EventTicketingPlatform.Controllers;

import com.example.EventTicketingPlatform.Security.JwtService;
import com.example.EventTicketingPlatform.Services.UserService;
import com.example.EventTicketingPlatform.domain.Entities.User;
import com.example.EventTicketingPlatform.domain.dtos.AuthResponseDto;
import com.example.EventTicketingPlatform.domain.dtos.LoginRequestDto;
import com.example.EventTicketingPlatform.domain.dtos.RegisterRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(AuthResponseDto.builder()
                .token(token)
                .user(AuthResponseDto.UserData.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto registerRequest) {
        User user = userService.registerUser(
                registerRequest.getName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getRole()
        );

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(AuthResponseDto.builder()
                .token(token)
                .user(AuthResponseDto.UserData.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .build());
    }
}
