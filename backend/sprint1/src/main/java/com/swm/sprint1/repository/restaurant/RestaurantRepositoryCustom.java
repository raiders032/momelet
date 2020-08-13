package com.swm.sprint1.repository.restaurant;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.Restaurant;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;

import java.math.BigDecimal;
import java.util.List;

public interface RestaurantRepositoryCustom {

    List<RetrieveRestaurantResponseV1> findRetrieveRestaurantByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Category> categoryList);

    List<RetrieveRestaurantResponse> findRetrieveRestaurantResponseByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id);

    List<Restaurant> findByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Category> categoryList);

    List<Restaurant> findByLatitudeAndLongitudeAndCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long category_id, Long limit);
}
