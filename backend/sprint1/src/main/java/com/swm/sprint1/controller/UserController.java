package com.swm.sprint1.controller;


import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.BadRequestException;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.payload.request.UpdateUserRequest;
import com.swm.sprint1.payload.response.ApiResponse;
import com.swm.sprint1.payload.response.RetrieveUserResponse;
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
import java.time.LocalDateTime;
import java.util.List;

@Api(value = "user")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @ApiOperation(value = "유저의 정보를 반환")
    @GetMapping("/users/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser2(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @ApiOperation(value = "유저의 정보를 반환")
    @GetMapping("/api/v1/users/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> retrieveUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        List<String> categories = userService.getUserCategoryName(user.getId());
        return ResponseEntity.ok(new RetrieveUserResponse(user.getId(),user.getName(), user.getEmail(), user.getImageUrl(), categories));
    }

    @ApiOperation(value = "유저의 목록을 반환")
    @GetMapping("/api/v1/users")
    @PreAuthorize("hasRole('USER')")
    public List<User> getUserList(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findAllCustom();
    }


    @ApiOperation(value = "유저 정보 수정")
    @PutMapping("/api/v1/users/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUserInfo(@CurrentUser UserPrincipal userPrincipal, @Valid @RequestBody UpdateUserRequest request, @PathVariable Long id){
        if(!id.equals(userPrincipal.getId()))
            throw new BadRequestException("유효하지 않은 id : " + id);
        userService.updateUser(id, request);
        return ResponseEntity.ok(new ApiResponse(LocalDateTime.now(),true,"회원 정보 수정 완료"));
    }
}
