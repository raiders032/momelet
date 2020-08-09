package com.swm.sprint1.service;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;
import com.swm.sprint1.repository.category.CategoryRepository;
import com.swm.sprint1.repository.restaurant.RestaurantRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final UserCategoryRepository userCategoryRepository;

    public List<RetrieveRestaurantResponseV1> findRestaurantByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        if(id == null)
            return restaurantRepository.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, new ArrayList<>());
        List<Category> categoryByUserId = userCategoryRepository.findCategoryByUserId(id);
        return restaurantRepository.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, categoryByUserId);
    }

    public List<RetrieveRestaurantResponse> findRestaurantByLatitudeAndLongitudeAndUserCategoryV2(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        return restaurantRepository.findRestaurantByLatitudeAndLongitudeAndUserCategoryV2(latitude,longitude,radius,id);
    }
}
