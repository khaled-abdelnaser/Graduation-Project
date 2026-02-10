package com.smartdoctor.assistant.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smartdoctor.assistant.dto.LoginRequestDto;
import com.smartdoctor.assistant.dto.LoginResponseDto;
import com.smartdoctor.assistant.dto.UserRequestDto;
import com.smartdoctor.assistant.dto.UserResponseDto;
import com.smartdoctor.assistant.model.User;
import com.smartdoctor.assistant.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDto createUser(UserRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("هذا البريد الإلكتروني مسجل بالفعل");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User savedUser = userRepository.save(user);

        return new UserResponseDto(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail());
    }

    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail()))
                .collect(Collectors.toList());
    }

    public LoginResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("البريد الإلكتروني غير مسجل"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("كلمة المرور غير صحيحة");
        }

        return new LoginResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail());
    }
}
