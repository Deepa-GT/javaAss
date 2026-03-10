package com.lms.gymbackend.controller;

import com.lms.gymbackend.entity.User;
import com.lms.gymbackend.model.Role;
import com.lms.gymbackend.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public static class RegisterRequest {
        @NotBlank
        public String username;
        @NotBlank
        public String password;
        public String email;
        public String fullName;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.username)) {
            return ResponseEntity.badRequest().body(Map.of("error", "username_taken"));
        }
        User user = new User();
        user.setUsername(request.username);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setEmail(request.email);
        user.setFullName(request.fullName);
        user.setRole(Role.USER);
        userRepository.save(user);
        return ResponseEntity.created(URI.create("/api/members/" + user.getId())).body(Map.of("id", user.getId()));
        }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }
        return userRepository.findByUsername(authentication.getName())
                .map(user -> ResponseEntity.ok(Map.of(
                        "authenticated", true,
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail() != null ? user.getEmail() : "",
                        "fullName", user.getFullName() != null ? user.getFullName() : "",
                        "role", user.getRole().name(),
                        "authorities", authentication.getAuthorities()
                )))
                .orElse(ResponseEntity.ok(Map.of("authenticated", false)));
    }
}
