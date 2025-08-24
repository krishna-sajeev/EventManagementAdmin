package com.event.backened.controller;


import com.event.backened.model.User;
import com.event.backened.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserRepository userRepo;

    public static final Map<String, String> tokenStore = new HashMap<>();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User input) {
        Map<String, String> response = new HashMap<>();
        try {
            if (input.getEmail() == null || input.getPassword() == null
                    || input.getConfirmPassword() == null) {

                return ResponseEntity.badRequest().body(Map.of("status", "Missing required fields"));
            }

            if (userRepo.existsByEmail(input.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("status", "User already registered with this email"));
            }

            if (!input.getPassword().equals(input.getConfirmPassword())) {
                return ResponseEntity.badRequest().body(Map.of("status", "Passwords do not match"));
            }
            User saved = userRepo.save(input);
            saved.setUserId("ADM" + saved.getId());
            userRepo.save(input);
            response.put("status", "Registered successfully");
        } catch (Exception e) {
            response.put("status", "Registeration Failed");
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User input) {
        try {
            if (input.getEmail() == null || input.getPassword() == null) {
                return ResponseEntity.badRequest().body(
                        Map.of("status", "error", "message", "Missing login fields")
                );
            }

            Optional<User> userOpt = userRepo.findByEmail(input.getEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body(
                        Map.of("status", "error", "message", "Invalid credentials")
                );
            }

            User userFromDb = userOpt.get();

            System.out.println(userFromDb.getPassword());
            System.out.println(input.getPassword());
            if (!(input.getPassword()).equals(userFromDb.getPassword())) {
                return ResponseEntity.status(401).body(
                        Map.of("status", "error", "message", "Invalid password ")
                );
            }


            String token = UUID.randomUUID().toString();
            tokenStore.put(token, input.getEmail());
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("token", token);
            response.put("user", Map.of(
                    "userId", userFromDb.getUserId(),
                    "fullName", userFromDb.getFullName(),
                    "email", userFromDb.getEmail()

            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Map.of("status", "error", "message", "Login failed", "error", e.getMessage())
            );
        }
    }
}
