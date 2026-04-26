package com.example.EventTicketingPlatform.Services;

import com.example.EventTicketingPlatform.Repositories.UserRepository;
import com.example.EventTicketingPlatform.domain.Entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User registerUser(String name, String email, String password, String role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        com.example.EventTicketingPlatform.domain.Entities.UserRole userRole;
        try {
            userRole = (role != null) 
                ? com.example.EventTicketingPlatform.domain.Entities.UserRole.valueOf(role.toUpperCase().trim()) 
                : com.example.EventTicketingPlatform.domain.Entities.UserRole.ATTENDEE;
        } catch (Exception e) {
            userRole = com.example.EventTicketingPlatform.domain.Entities.UserRole.ATTENDEE;
        }

        User user = User.builder()
                .email(email)
                .name(name)
                .password(password)
                .role(userRole)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    public User findOrCreateByEmail(String email, String name) {
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            return existing.get();
        }

        User user = User.builder()
                .email(email)
                .name(name == null || name.isBlank() ? "Unknown" : name)
                .role(com.example.EventTicketingPlatform.domain.Entities.UserRole.ATTENDEE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }
}
