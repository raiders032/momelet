package com.swm.sprint1.controller;

import com.swm.sprint1.domain.AuthProvider;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.BadRequestException;
import com.swm.sprint1.exception.BindingException;
import com.swm.sprint1.payload.request.JwtDto;
import com.swm.sprint1.payload.request.LoginRequest;
import com.swm.sprint1.payload.request.SignUpRequest;
import com.swm.sprint1.payload.response.ApiResponse;
import com.swm.sprint1.payload.response.AuthResponse;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.security.CurrentUser;
import com.swm.sprint1.security.Token;
import com.swm.sprint1.security.TokenProvider;
import com.swm.sprint1.security.UserPrincipal;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @ApiOperation(value = "유저 로그인", notes = "로그인 하고 응답으로 액세스 토큰과 리프레시 토큰을 발급합니다.")
    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.debug("authenticateUser 호출되었습니다.");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        List<Token> token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token.get(0), token.get(1)));
    }

    @ApiOperation(value = "유저 생성", notes = "유저를 생성합니다. 응답으로 액세스 토큰과 리프레시 토큰을 발급합니다..")
    @PostMapping("/api/v1/auth/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        logger.debug("registerUser 호출되었습니다.");
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            logger.error("Email address already in use.");
            throw new BadRequestException("Email address already in use.");
        }

        User user = User.builder()
                .name(signUpRequest.getName())
                .email(signUpRequest.getEmail())
                .emailVerified(false)
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .provider(AuthProvider.test)
                .providerId("test")
                .build();

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signUpRequest.getEmail(),
                        signUpRequest.getPassword()
                )
        );

        List<Token> token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token.get(0), token.get(1)));
    }

    @ApiOperation(value = "액세스 토큰 유효성 검사", notes = "토큰의 유효성을 검사하고 결과를 반환합니다.")
    @PostMapping("/api/v1/auth/validation")
    public ResponseEntity<?> validateJwtToken(@Valid @RequestBody JwtDto jwtDto, BindingResult result){
        logger.debug("validateJwtToken 호출되었습니다.");
        if(result.hasErrors()) {
            logger.error("validateJwtToken binding error : ");
            throw new BindingException(result.getFieldError().getDefaultMessage());
        }
        tokenProvider.validateToken(jwtDto.getJwt());
        return ResponseEntity.ok(new ApiResponse(true, "유효한 토큰 입니다."));
    }

    @ApiOperation(value = "액세스 토큰 & 리프레시 토큰 재발급", notes = "헤더의 리프레시 토큰을 넣어 보내면 새로 갱신된 액세스 토큰과 리프레시 토큰을 발급합니다.")
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/api/v1/auth/refresh")
    public ResponseEntity<?> refreshJwtToken(@CurrentUser UserPrincipal userPrincipal,
                                             WebRequest request){
        logger.debug("refreshJwtToken 호출되었습니다.");
        String jwtFromRequest = getJwtFromRequest(request);
        tokenProvider.validateRefreshToken(userPrincipal.getId(), jwtFromRequest);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<Token> tokens = tokenProvider.createToken(authentication);

        ApiResponse response = new ApiResponse(true, "토큰 갱신 완료");
       response.putData("tokens", new AuthResponse(tokens.get(0), tokens.get(1)));
        return ResponseEntity.ok(response);
    }

    private String getJwtFromRequest(WebRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
