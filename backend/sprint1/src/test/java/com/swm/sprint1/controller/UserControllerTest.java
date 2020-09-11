package com.swm.sprint1.controller;


import com.swm.sprint1.domain.AuthProvider;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.ResourceNotFoundException;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
@RunWith(SpringRunner.class)
public class UserControllerTest {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    private final Logger logger = LoggerFactory.getLogger(UserControllerTest.class);

    private User user;

    private String  jwtToken;

    @Before
    public void init(){
        user = User.builder()
                .name("kjy")
                .email("kjy@test.com")
                .imageUrl("imageurl")
                .provider(AuthProvider.local)
                .providerId("test")
                .userCategories(new HashSet<>())
                .emailVerified(false)
                .build();
        userRepository.save(user);
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
        List<Token> tokens = tokenProvider.createToken(authentication);
        jwtToken = "Bearer "+tokens.get(0).getJwtToken();
    }

    @After
    public void clear(){
        logger.info("유저 리포지토 비우기");
        userRepository.deleteAll();
    }

    @Test
    public void 유저정보수정() throws Exception {
        //given
        logger.info("유저정보수정 테스트 시작");
        String url = "/api/v1/users/"+ user.getId();
        String name = "변경된이름";
        String categories = "한식,일식,중식";
        MockMultipartFile file = new MockMultipartFile("imageFile", "test.jpg", "image/jpg", "asdasdasd".getBytes());

        //when
        mockMvc.perform(MockMvcRequestBuilders.multipart(url)
                .file(file)
                .param("name", name)
                .param("categories", categories)
                .header("Authorization", jwtToken))
                .andExpect(status().isOk());

        //then
        User findUser = userRepository.findUserWithUserCategory(this.user.getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", this.user.getId()));
        assertThat(findUser.getName()).isEqualTo(name);
        assertThat(findUser.getUserCategories().size()).isEqualTo(3);
        assertThat(findUser.getUserCategories());
        assertThat(findUser.getImageUrl()).startsWith("https://dz1rd925xfsaa.cloudfront.net");
        assertThat(findUser.getImageUrl()).endsWith("_640x640.jpeg");
    }

    @Test
    public void 유저정보수정_파일을보내지않았을때() throws Exception {
        //given
        String url = "/api/v1/users/"+ user.getId();
        String name = "변경된이름";
        String categories = "한식,일식,중식";

        //when
        mockMvc.perform(MockMvcRequestBuilders.multipart(url)
                .param("name", name)
                .param("categories", categories)
                .header("Authorization", jwtToken))
                .andExpect(status().isOk());

        //then
        User findUser = userRepository.findUserWithUserCategory(this.user.getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", this.user.getId()));
        assertThat(findUser.getName()).isEqualTo(name);
        assertThat(findUser.getUserCategories().size()).isEqualTo(3);
        assertThat(findUser.getUserCategories());
        assertThat(findUser.getImageUrl()).isEqualTo(user.getImageUrl());
    }

    @Test
    public void 유저정보수정_이름을보내지않은경우() throws Exception {
        //given
        String url = "/api/v1/users/"+ user.getId();
        String name = "";
        String categories = "한식,일식,중식";
        MockMultipartFile file = new MockMultipartFile("imageFile", "test.jpg", "image/jpg", "asdasdasd".getBytes());

        //when
        ResultActions perform = mockMvc.perform(multipart(url)
                .file(file)
                .param("name", name)
                .param("categories", categories)
                .header("Authorization", jwtToken));

        //then
        perform
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.errorCode").value("100"))
                .andExpect(jsonPath("$.success").value("false"));

        User findUser = userRepository.findById(this.user.getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", this.user.getId()));
        assertThat(findUser.getName()).isEqualTo(user.getName());
        assertThat(findUser.getImageUrl()).isEqualTo(user.getImageUrl());
    }

    @Test
    public void 유저정보수정_카테고리를보내지않은경우() throws Exception {
        //given
        String url = "/api/v1/users/"+ user.getId();
        String name = "변경된이름";
        String categories = "";
        MockMultipartFile file = new MockMultipartFile("imageFile", "test.jpg", "image/jpg", "asdasdasd".getBytes());

        //when
        ResultActions perform = mockMvc.perform(multipart(url)
                .file(file)
                .param("name", name)
                .param("categories", categories)
                .header("Authorization", jwtToken));

        //then
        perform
                .andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.errorCode").value("100"))
                .andExpect(jsonPath("$.success").value("false"));

        User findUser = userRepository.findById(this.user.getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", this.user.getId()));
        assertThat(findUser.getName()).isEqualTo(user.getName());
        assertThat(findUser.getImageUrl()).isEqualTo(user.getImageUrl());
    }
}