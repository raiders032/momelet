package com.swm.sprint1.service;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.Restaurant;
import com.swm.sprint1.repository.restaurant.RestaurantRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final UserCategoryRepository userCategoryRepository;

    public List<Restaurant> findRestaurantByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude, BigDecimal radius) {
        return restaurantRepository.findRestaurantByLatitudeAndLongitude(latitude,longitude,radius);
    }

    public List<Restaurant> findRestaurantByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        List<Category> categoryByUserId = userCategoryRepository.findCategoryByUserId(id);
        return restaurantRepository.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, categoryByUserId);
    }

    public List<Restaurant> findRandomRestaurantByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude, BigDecimal radius) {
        return restaurantRepository.findRandomRestaurantByLatitudeAndLongitude(latitude,longitude,radius);
    }
}
