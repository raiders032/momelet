package com.swm.sprint1.service;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.CategoryNumber;
import com.swm.sprint1.domain.Restaurant;
import com.swm.sprint1.exception.RestaurantLessThan7Exception;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;
import com.swm.sprint1.repository.category.CategoryRepository;
import com.swm.sprint1.repository.restaurant.RestaurantRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;

    public List<RetrieveRestaurantResponseV1> findRestaurantByLatitudeAndLongitudeAndUserCategoryV1(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        if(id == null)
            return restaurantRepository.findRetrieveRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, new ArrayList<>());
        List<Category> categoryByUserId = userCategoryRepository.findCategoryByUserId(id);
        return restaurantRepository.findRetrieveRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, categoryByUserId);
    }

    public List<RetrieveRestaurantResponse> findRetrieveRestaurantResponse(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        return restaurantRepository.findRetrieveRestaurantResponseByLatitudeAndLongitudeAndUserCategory(latitude,longitude,radius,id);
    }

    public List<RetrieveRestaurantResponse> findRestaurant7SimpleCategoryBased(List<Long> ids, BigDecimal longitude, BigDecimal latitude, BigDecimal radius) {
        List<CategoryNumber> categoryNumbers = userCategoryRepository.findCategoryAndCountByUserId(ids);
        Set<Restaurant> restaurantSet = new HashSet<>();
        /*  List<Category> categories = categoryNumbers.stream().map(CategoryNumber::getCategory).collect(Collectors.toList());
        List<Restaurant> restaurantList = restaurantRepository.findByLatitudeAndLongitudeAndCategories(latitude, longitude, radius, categories);
        */
        categoryNumbers.forEach(categoryNumber ->{
                    restaurantSet.addAll(
                            restaurantRepository.findByLatitudeAndLongitudeAndCategory(
                                    latitude,
                                    longitude,
                                    radius,
                                    categoryNumber.getCategory().getId(),
                                    categoryNumber.getNumber() + 7L));
        });
        if(restaurantSet.size() < 7)
            throw new RestaurantLessThan7Exception("선택된 식당 카드가 7장 미만입니다.");
        List<Restaurant> restaurants = new ArrayList<>(restaurantSet);
        Collections.shuffle(restaurants);
        restaurants = restaurants.subList(0,7);
        return restaurants.stream()
                .map(restaurant -> new RetrieveRestaurantResponse(restaurant))
                .collect(Collectors.toList());
    }
}
