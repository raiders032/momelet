package com.swm.sprint1.controller;

import com.swm.sprint1.exception.JwtTokenNotValidException;
import com.swm.sprint1.payload.request.JwtDto;
import com.swm.sprint1.payload.response.ApiResponse;
import com.swm.sprint1.payload.response.AuthResponse;
import com.swm.sprint1.security.CurrentUser;
import com.swm.sprint1.security.Token;
import com.swm.sprint1.security.TokenProvider;
import com.swm.sprint1.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final TokenProvider tokenProvider;

    @PostMapping("/api/v1/auth/validation")
    public ResponseEntity<?> validateJwtToken(@RequestBody JwtDto jwt){
        tokenProvider.validateToken(jwt.getJwt());
        return ResponseEntity.ok(new ApiResponse(true, "유효한 토큰 입니다."));
    }

    @PostMapping("/api/v1/auth/refresh")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> refreshJwtToken(@CurrentUser UserPrincipal userPrincipal,
                                             @RequestBody JwtDto jwt){
        if(!tokenProvider.validateRefreshToken(userPrincipal.getId(), jwt.getJwt()))
            throw new JwtTokenNotValidException("유효하지 않은 리프레시 토큰 입니다.");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<Token> tokens = tokenProvider.createToken(authentication);

        ApiResponse response = new ApiResponse(true, "토큰 리프레시 완료");
        response.putData("tokens", new AuthResponse(tokens.get(0), tokens.get(1)));
        return ResponseEntity.ok(response);
    }

}
