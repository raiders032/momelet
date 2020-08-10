package com.swm.sprint1.repository.restaurant;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;

import java.math.BigDecimal;
import java.util.List;

public interface RestaurantRepositoryCustom {

    List<RetrieveRestaurantResponseV1> findRestaurantByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Category> categoryList);

    List<RetrieveRestaurantResponse> findRestaurantByLatitudeAndLongitudeAndUserCategoryV2(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id);

}
