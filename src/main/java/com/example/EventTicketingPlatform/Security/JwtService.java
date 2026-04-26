package com.example.EventTicketingPlatform.Security;

import com.example.EventTicketingPlatform.domain.Entities.User;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class JwtService {

    private final byte[] secretBytes;

    public JwtService(@Value("${app.security.jwt.secret}") String secret) {
        this.secretBytes = secret.getBytes(StandardCharsets.UTF_8);
    }

    public String generateToken(User user) {
        try {
            JWSSigner signer = new MACSigner(secretBytes);

            Instant now = Instant.now();
            Date issuedAt = Date.from(now);
            Date expiresAt = Date.from(now.plus(24, ChronoUnit.HOURS));

            // Build a claim set compatible with CustomJwtAuthenticationConverter
            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    // Keep subject as userId (UUID string) so existing parserUserId(jwt) continues to work
                    .subject(user.getId().toString())
                    .issueTime(issuedAt)
                    .expirationTime(expiresAt)
                    .claim("userId", user.getId().toString())
                    .claim("email", user.getEmail())
                    .claim("roles", List.of("ROLE_" + user.getRole().name()))
                    .claim("realm_access", Map.of("roles", List.of("ROLE_" + user.getRole().name())))
                    .build();

            SignedJWT signedJWT = new SignedJWT(new com.nimbusds.jose.JWSHeader(JWSAlgorithm.HS256), claims);
            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Failed to generate JWT", e);
        }
    }
}
