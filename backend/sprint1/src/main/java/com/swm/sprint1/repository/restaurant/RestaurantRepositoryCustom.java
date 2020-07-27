package com.swm.sprint1.repository.restaurant;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.Restaurant;

import java.math.BigDecimal;
import java.util.List;

public interface RestaurantRepositoryCustom {
    List<Restaurant> findRestaurantByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude, BigDecimal radius);

    List<Restaurant> findRandomRestaurantByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude, BigDecimal radius);

    List<Restaurant> findRestaurantByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Category> categoryList);
}
