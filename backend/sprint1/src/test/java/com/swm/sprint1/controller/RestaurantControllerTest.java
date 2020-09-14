package com.swm.sprint1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swm.sprint1.domain.AuthProvider;
import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.payload.response.ApiResponse;
import com.swm.sprint1.payload.response.RestaurantDtoResponse;
import com.swm.sprint1.repository.category.CategoryRepository;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.security.Token;
import com.swm.sprint1.security.TokenProvider;
import com.swm.sprint1.security.UserPrincipal;
import org.assertj.core.api.AbstractListAssert;
import org.assertj.core.api.ObjectAssert;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest
public class RestaurantControllerTest {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private final Logger logger = LoggerFactory.getLogger(RestaurantControllerTest.class);

    private User user;

    private String jwtToken;

    private String longitude;

    private String latitude;

    private String radius;

    @Before
    public void init() {
        user = User.builder()
                .name("테스트유")
                .email("test@test.com")
                .imageUrl("imageUrl")
                .provider(AuthProvider.local)
                .providerId("test")
                .userCategories(new HashSet<>())
                .emailVerified(false)
                .build();

        List<Category> all = categoryRepository.findAll();
        user.updateUserInfo(all);

        userRepository.save(user);

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
        List<Token> tokens = tokenProvider.createToken(authentication);
        jwtToken = "Bearer " + tokens.get(0).getJwtToken();

        latitude = BigDecimal.valueOf(37.5409583).toString();
        longitude = BigDecimal.valueOf(127.0684707).toString();
        radius = BigDecimal.valueOf(1).toString();
    }

    @After
    public void clear() {
        logger.info("유저 리포지토 비우기");
        userRepository.deleteAll();
    }

    @Test
    public void 식당조회() throws Exception {
        //given
        String url = "/api/v2/restaurants/users/"+ user.getId() +"/categories";

        //when
        MvcResult result = mockMvc.perform(get(url)
                .param("longitude", longitude)
                .param("latitude", latitude)
                .param("radius", radius)
                .header("authorization", jwtToken))
                .andExpect(status().isOk())
                .andReturn();

        //then
        /*resultActions
                .andExpect(jsonPath("$..categories").value())*/

        //then
        String contentAsString = result.getResponse().getContentAsString();
        ApiResponse apiResponse = objectMapper.readValue(contentAsString, ApiResponse.class);
        List<RestaurantDtoResponse> restaurants = (List<RestaurantDtoResponse>) apiResponse.getData().get("restaurants");
        assertThat(restaurants.size()).isEqualTo(100);
        AbstractListAssert<?, List<?>, Object, ObjectAssert<Object>> categories = assertThat(restaurants).extracting("categories").asList();
    }

}

















