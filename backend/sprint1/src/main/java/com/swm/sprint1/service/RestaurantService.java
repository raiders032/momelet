package com.swm.sprint1.service;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.exception.RestaurantLessThan7Exception;
import com.swm.sprint1.payload.response.RestaurantDtoResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;
import com.swm.sprint1.repository.restaurant.RestaurantRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final Logger logger = LoggerFactory.getLogger(RestaurantService.class);

    public List<RetrieveRestaurantResponseV1> findRestaurantByLatitudeAndLongitudeAndUserCategoryV1(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        if(id == null)
            return restaurantRepository.findRetrieveRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, new ArrayList<>());
        List<Category> categoryByUserId = userCategoryRepository.findCategoryByUserId(id);
        return restaurantRepository.findRetrieveRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, categoryByUserId);
    }

    public List<RestaurantDtoResponse> findRestaurantDtoResponse(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        return restaurantRepository.findRestaurantDtoResponseByLatitudeAndLongitudeAndUserCategory(latitude,longitude,radius,id);
    }

    public List<RestaurantDtoResponse> findRestaurant7SimpleCategoryBased(List<Long> ids, BigDecimal longitude, BigDecimal latitude, BigDecimal radius) {
        List<RestaurantDtoResponse> restaurants = restaurantRepository.findRestaurant7(latitude, longitude, radius, ids);
        if(restaurants.size() < 7){
            logger.info("선택된 식당 카드가 7장 미만이라 반경을 넓혀 다시 조회합니다.");
            restaurants = restaurantRepository.findRestaurant7(latitude, longitude, BigDecimal.valueOf(0.02), ids);
            if(restaurants.size() < 7){
                logger.error("선택된 식당 카드가 7장 미만입니다.");
                throw new RestaurantLessThan7Exception("선택된 식당 카드가 7장 미만입니다.");
            }
        }
        return restaurants;
    }
}
