package com.smartdoctor.assistant.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smartdoctor.assistant.dto.LoginRequestDto;
import com.smartdoctor.assistant.dto.LoginResponseDto;
import com.smartdoctor.assistant.dto.UserRequestDto;
import com.smartdoctor.assistant.dto.UserResponseDto;
import com.smartdoctor.assistant.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequestDto user) {
        try {
            UserResponseDto createdUser = userService.createUser(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(createdUser);
        } catch (RuntimeException e) {
            // Check if it's a duplicate email error
            if (e.getMessage() != null && e.getMessage().contains("هذا البريد الإلكتروني مسجل بالفعل")) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT) // 409
                        .body(e.getMessage());
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequestDto request) {
        try {
            LoginResponseDto response = userService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Check if it's a user not found error
            if (e.getMessage() != null && e.getMessage().contains("البريد الإلكتروني غير مسجل")) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND) // 404
                        .body(e.getMessage());
            }
            // Check if it's an invalid password error
            if (e.getMessage() != null && e.getMessage().contains("كلمة المرور غير صحيحة")) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED) // 401
                        .body(e.getMessage());
            }
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
