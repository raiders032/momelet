package com.swm.sprint1.controller;


import com.swm.sprint1.domain.AuthProvider;
import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.security.Token;
import com.swm.sprint1.security.TokenProvider;
import com.swm.sprint1.security.UserPrincipal;
import org.assertj.core.api.Assertions;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
                .emailVerified(false)
                .userCategories(null)
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
        String url = "/api/v1/users/"+ user.getId();
        String name = "바꾼이름";
        String categories = "한식,일식,중식";
        MockMultipartFile file = new MockMultipartFile("imageFile", "test.jpg", "image/jpg", "asdasdasd".getBytes());

        //when
        mockMvc.perform(MockMvcRequestBuilders.multipart(url)
                .file(file)
                .param("name", name)
                .param("categories", categories)
                .header("Authorization", jwtToken)).andExpect(status().isOk()).andDo(print());

        //then
        User user = userRepository.findUserWithUserCategory(this.user.getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", this.user.getId()));
        assertThat(user.getName()).isEqualTo(name);
        assertThat(user.getUserCategories().size()).isEqualTo(3);
        assertThat(user.getImageUrl()).startsWith("https://dz1rd925xfsaa.cloudfront.net");
        assertThat(user.getImageUrl()).endsWith("_640x640.jpeg");

    }
}