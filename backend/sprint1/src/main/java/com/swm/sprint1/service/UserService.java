package com.swm.sprint1.service;

import com.swm.sprint1.domain.*;
import com.swm.sprint1.exception.NotSupportedExtension;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.payload.request.SignUpRequest;
import com.swm.sprint1.payload.request.UpdateUserRequest;
import com.swm.sprint1.repository.category.CategoryRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Uploader s3Uploader;

    @Value("${app.s3.profile.dir}")
    private String dir;

    @Transactional
    public void updateUser(Long id, MultipartFile imageFile, String name, List<String> categoies) throws IOException {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        List<Category> categories = categoryRepository.findCategoryByCategoryName(categoies);
        String imageUrl;

        if(imageFile != null)
            imageUrl = uploadImageFile(imageFile);
        else
            imageUrl = user.getImageUrl();

        user.updateUserInfo(name, imageUrl, categories);
    }

    public String uploadImageFile(MultipartFile imageFile) throws IOException {
        String imageUrl;
        String filename = imageFile.getOriginalFilename();
        String extension = filename.substring(filename.lastIndexOf("."));
        List<String> supportedExtension = Arrays.asList(".jpg", ".jpeg", ".png");
        if(!supportedExtension.contains(extension))
            throw new NotSupportedExtension(extension + "은 지원하지 않는 확장자입니다. jpg, jpeg, png만 지원합니다.");
        imageUrl = s3Uploader.upload(imageFile, dir);
        return imageUrl;
    }

    public List<String> findCategoryNameByUserId(Long id) {
        return userCategoryRepository.findCategoryNameByUserId(id);
    }

    public Map<String, Integer> findAllCategoryNameByUserId(Long id) {
        return userCategoryRepository.findAllCategoryNameByUserId(id);
    }

}
