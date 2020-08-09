package com.swm.sprint1.service;

import com.swm.sprint1.domain.AuthProvider;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.payload.request.UpdateUserRequest;
import com.swm.sprint1.repository.user.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;


@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired private UserService userService;
    @Autowired private UserRepository userRepository;

    @Test
    public void updateUser() {
        //given
        String name = "김민수";
        String imageUrl ="123";
        Long userId = userRepository.save(new User(name, AuthProvider.local)).getId();

        String newName = "김민수2";
        String newImageUrl = "456";
        List<String> arrayList = new ArrayList<>(Arrays.asList("한식", "양식"));
        UpdateUserRequest request = UpdateUserRequest.builder()
                .name(newName)
                .imageUrl(newImageUrl)
                .categories(arrayList)
                .build();

        //when
        userService.updateUser(userId, request);

        //then
        User findUser = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        assertThat(findUser.getImageUrl()).isEqualTo(newImageUrl);
        assertThat(findUser.getName()).isEqualTo(newName);
        assertThat(findUser.getUserCategories().stream()
                .map(userCategory -> userCategory.getCategory().getName()).collect(Collectors.toList())).containsAll(arrayList);
    }

    @Test
    public void getUserCategoryName() {
    }
}