package com.swm.sprint1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swm.sprint1.domain.AuthProvider;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.domain.UserRefreshToken;
import com.swm.sprint1.payload.request.JwtDto;
import com.swm.sprint1.repository.user.UserRefreshTokenRepository;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.security.Token;
import com.swm.sprint1.security.TokenProvider;
import com.swm.sprint1.security.UserPrincipal;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.HashSet;
import java.util.List;

import static java.lang.Thread.sleep;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserRefreshTokenRepository userRefreshTokenRepository;

    private final Logger logger = LoggerFactory.getLogger(AuthControllerTest.class);

    private User user;

    private String preAccessToken, accessToken;

    private String preRefreshToken, refreshToken;

    private String otherRefreshToken;

    private String otherAccessToken;
    @Before
    public void init() throws InterruptedException {
        user = User.builder()
                .name("유저1")
                .email("user1@test.com")
                .imageUrl("imageUrl")
                .provider(AuthProvider.local)
                .providerId("test")
                .userCategories(new HashSet<>())
                .emailVerified(false)
                .build();

        User user2 = User.builder()
                .name("유저2")
                .email("user2@test.com")
                .imageUrl("imageUrl")
                .provider(AuthProvider.local)
                .providerId("test")
                .userCategories(new HashSet<>())
                .emailVerified(false)
                .build();

        userRepository.save(user);
        userRepository.save(user2);

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());

        List<Token> preTokens = tokenProvider.createToken(authentication);
        preAccessToken = preTokens.get(0).getJwtToken();
        preRefreshToken = preTokens.get(1).getJwtToken();

        UserPrincipal userPrincipal2 = UserPrincipal.create(user2);
        UsernamePasswordAuthenticationToken authentication2 = new UsernamePasswordAuthenticationToken(userPrincipal2, null, userPrincipal2.getAuthorities());

        List<Token> otherTokens = tokenProvider.createToken(authentication2);
        otherAccessToken = otherTokens.get(0).getJwtToken();
        otherRefreshToken = otherTokens.get(1).getJwtToken();

        sleep(1000);

        List<Token> tokens = tokenProvider.createToken(authentication);
        accessToken = tokens.get(0).getJwtToken();
        refreshToken= tokens.get(1).getJwtToken();
    }

    @After
    public void clear() {
        logger.info("유저 리포지토 비우기");
        userRepository.deleteAll();
        userRefreshTokenRepository.deleteAll();
    }

    @Test
    public void 리프레시_토큰_검증() throws Exception {
        //given
        String uri = "/api/v1/auth/validation/refresh";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(refreshToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content));

        //then
        result
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"));
    }

    @Test
    public void 리프레시_토큰_검증_다른_유저의_리프레시_토큰() throws Exception {
        //given
        String uri = "/api/v1/auth/validation/refresh";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(otherRefreshToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content));

        //then
        result
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value("false"))
                .andExpect(jsonPath("$.errorCode").value("104"));
    }

    @Test
    public void 리프레시_토큰_검증_이전_리프레시_토큰() throws Exception {
        //given
        String uri = "/api/v1/auth/validation/refresh";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(preRefreshToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content))
                .andDo(print());

        //then
        result
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value("false"))
                .andExpect(jsonPath("$.errorCode").value("403"));
    }

    @Test
    public void 리프레시_토큰_검증_액세스토큰보내기() throws Exception {
        //given
        String uri = "/api/v1/auth/validation/refresh";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(accessToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content));

        //then
        result
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value("false"))
                .andExpect(jsonPath("$.errorCode").value("404"));
    }

    @Test
    public void 액세스_토큰_검증() throws Exception{
        //given
        String uri = "/api/v1/auth/validation/access";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(accessToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content));

        //then
        result
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"));
    }

    @Test
    public void 액세스_토큰_검증_다른_유저의_액세스_토큰() throws Exception {
        //given
        String uri = "/api/v1/auth/validation/access";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(otherAccessToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content));

        //then
        result
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value("false"))
                .andExpect(jsonPath("$.errorCode").value("104"));
    }

    @Test
    public void 액세스_토큰_검증_이전_액세스_토큰() throws Exception {
        //given
        String uri = "/api/v1/auth/validation/access";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(preAccessToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content))
                .andDo(print());

        //then
        result
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"));
    }

    @Test
    public void 액세스_토큰_검증_리프레시토큰보내기() throws Exception {
        //given
        String uri = "/api/v1/auth/validation/access";
        JwtDto jwtDto = JwtDto.builder()
                .userId(user.getId())
                .jwt(refreshToken)
                .build();
        String content = objectMapper.writeValueAsString(jwtDto);

        //when
        ResultActions result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(content));

        //then
        result
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value("false"))
                .andExpect(jsonPath("$.errorCode").value("404"));
    }
}