package com.swm.sprint1.controller;


import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.payload.response.ApiResponse;
import com.swm.sprint1.payload.response.GetUserResponse;
import com.swm.sprint1.payload.request.UpdateUserCategoryRequest;
import com.swm.sprint1.payload.request.UserUpdateRequest;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.security.CurrentUser;
import com.swm.sprint1.security.UserPrincipal;
import com.swm.sprint1.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(value = "user")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserCategoryRepository userCategoryRepository;

    @ApiOperation(value = "유저의 정보를 반환")
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser2(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @ApiOperation(value = "유저의 정보를 수정", notes = "유저의 이름을 변경한다")
    @PutMapping("/api/v1/user/name")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUserName(@CurrentUser UserPrincipal userPrincipal
            , @Valid @RequestBody UserUpdateRequest request){
        userService.updateUser(userPrincipal.getId(),request.getName());
        return ResponseEntity.ok(new ApiResponse(true,"nickname 수정 완료"));
    }

    @ApiOperation(value = "유저의 카테고리 수정")
    @PutMapping("/api/v1/user/category")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUserCategories(@CurrentUser UserPrincipal userPrincipal
            , @Valid @RequestBody UpdateUserCategoryRequest updateUserCategoryRequest){
        ApiResponse response = userService.updateUserCategories(userPrincipal.getUser(), updateUserCategoryRequest);
        return ResponseEntity.ok(response);
    }

    @ApiOperation(value = "유저의 정보를 반환")
    @GetMapping("/api/v1/user/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        List<String> categoryName = userService.getUserCategoryName(userPrincipal.getId());
        return ResponseEntity.ok(new GetUserResponse(user.getId(),user.getName(), user.getEmail(), user.getImageUrl(), categoryName));
    }

    @ApiOperation(value = "유저의 목록을 반환")
    @GetMapping("/api/v1/users")
    @PreAuthorize("hasRole('USER')")
    public List<User> getUserList(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findAllCustom();
    }


}
