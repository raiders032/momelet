package com.swm.sprint1.service;

import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.Restaurant;
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
            return restaurantRepository.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, new ArrayList<>());
        List<Category> categoryByUserId = userCategoryRepository.findCategoryByUserId(id);
        return restaurantRepository.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, categoryByUserId);
    }

    public List<RetrieveRestaurantResponse> findRetrieveRestaurantResponse(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        return restaurantRepository.findRetrieveRestaurantResponseByLatitudeAndLongitudeAndUserCategory(latitude,longitude,radius,id);
    }

    public List<RetrieveRestaurantResponse> findRestaurant7SimpleCategoryBased(List<Long> ids, BigDecimal longitude, BigDecimal latitude, BigDecimal radius) {
        /*List<CategoryCount> categoryCounts = categoryRepository.findAll().stream().sorted(Comparator.comparing(Category::getId))
                .map(CategoryCount::new).collect(Collectors.toList());


        ids.forEach((id)->{
            userCategoryRepository.findCategoryByUserId(id).forEach(category -> {
                categoryCounts.get(Math.toIntExact(category.getId() - 1)).countUp(1);
            });
        });*/

        List<CategoryCount> categoryCounts = userCategoryRepository.findCategoryAndCountByUserId(ids);
        Set<Restaurant> restaurantSet = new HashSet<>();

        /*categoryCounts.stream().sorted().filter(categoryCount -> categoryCount.getCount() > 0).collect(Collectors.toList())
                .forEach(category ->{
                    List<Restaurant> restaurants = restaurantRepository.findRestaurantByLatitudeAndLongitudeAndCategory(latitude, longitude, radius, category.getCategory().getId(), category.getCount() + 7L);
                    restaurantSet.addAll(restaurants);
        });*/

        List<Restaurant> restaurants = new ArrayList<>(restaurantSet);
        Collections.shuffle(restaurants);
        restaurants = restaurants.subList(0,7);
        List<RetrieveRestaurantResponse> result = restaurants.stream().map(restaurant -> {
            return new RetrieveRestaurantResponse(restaurant);
        }).collect(Collectors.toList());
        return result;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class CategoryCount {
        Category category;
        Long count = 0L;

        public CategoryCount(Category category, Long count) {
            this.category = category;
            this.count = count;
        }
    }
}
