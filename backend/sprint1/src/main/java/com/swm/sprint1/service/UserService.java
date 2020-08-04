package com.swm.sprint1.service;

import com.swm.sprint1.domain.*;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.payload.request.SignUpRequest;
import com.swm.sprint1.payload.request.UpdateUserRequest;
import com.swm.sprint1.repository.category.CategoryRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import com.swm.sprint1.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(SignUpRequest signUpRequest) {
        User user = new User(signUpRequest.getName(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                AuthProvider.local);
        return userRepository.save(user);
    }

    @Transactional
    public void updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        List<Category> categories = categoryRepository.findCategoryByCategoryName(request.getCategories());
        userCategoryRepository.deleteUserCategory(id);
        user.updateUserInfo(request.getName(), request.getImageUrl(), categories);
        userCategoryRepository.saveAll(user.getUserCategories());
    }

    public List<String> getUserCategoryName(Long id) {
        return userCategoryRepository.findCategoryNameByUserId(id);
    }

}
