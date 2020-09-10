package com.swm.sprint1.service;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.NotSupportedExtension;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.payload.request.UpdateUserRequest;
import com.swm.sprint1.repository.category.CategoryRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final S3Uploader s3Uploader;
    private final static Logger logger  = LoggerFactory.getLogger(UserService.class);

    @Value("${app.s3.profile.dir}")
    private String dir;

    @Transactional
    public void updateUser(Long id, UpdateUserRequest request) throws IOException {
        String filename = request.getImageFile().getOriginalFilename();
        String extension = filename.substring(filename.lastIndexOf("."));
        List<String> supportedExtension = Arrays.asList(".jpg", ".jpeg", ".png");
        if(!supportedExtension.contains(extension)) {
            logger.error( extension + "는 지원하지 않는 확장자입니다. jpg, jpeg, png만 지원합니다.");
            throw new NotSupportedExtension(extension + "은 지원하지 않는 확장자입니다. jpg, jpeg, png만 지원합니다.");
        }
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        List<Category> categories = categoryRepository.findCategoryByCategoryName(request.getCategories());
        String imageUrl = s3Uploader.upload(request.getImageFile(), dir);
        user.updateUserInfo(request.getName(), imageUrl, categories);
    }

    public Map<String, Integer> findAllCategoryNameByUserId(Long id) {
        return userCategoryRepository.findAllCategoryNameByUserId(id);
    }
}
