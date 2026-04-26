package com.example.EventTicketingPlatform.Security;


import com.example.EventTicketingPlatform.Repositories.UserRepository;
import com.example.EventTicketingPlatform.Security.JwtService;
import com.example.EventTicketingPlatform.domain.Entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class GoogleOAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;       // YOUR JWT SERVICE
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User u = User.builder()
                        .id(java.util.UUID.randomUUID())
                        .email(email)
                        .name(name)
                        .role(com.example.EventTicketingPlatform.domain.Entities.UserRole.ATTENDEE)
                        .createdAt(java.time.LocalDateTime.now())
                        .updatedAt(java.time.LocalDateTime.now())
                        .build();
                    return userRepository.save(u);
                });


        // 2️⃣ Generate JWT (EXACT SAME STRUCTURE as before)
        String jwt = jwtService.generateToken(user);

        // 3️⃣ Redirect to frontend with JWT
        response.sendRedirect(
                "http://localhost:5174/oauth-success?token=" + jwt
        );
    }
}
