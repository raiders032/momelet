package com.swm.sprint1.controller;

import com.swm.sprint1.domain.Restaurant;
import com.swm.sprint1.repository.restaurant.RestaurantRepository;
import com.swm.sprint1.repository.user.UserCategoryRepository;
import com.swm.sprint1.security.CurrentUser;
import com.swm.sprint1.security.UserPrincipal;
import com.swm.sprint1.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class RestaurantController {
    private final RestaurantRepository restaurantRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final RestaurantService restaurantService;

    @GetMapping("/api/v1/restaurant")
    public ResponseEntity<?> getRestaurant(@RequestParam BigDecimal longitude, @RequestParam BigDecimal latitude,@RequestParam BigDecimal radius){
        List<Restaurant> restaurantList =restaurantService.findRandomRestaurantByLatitudeAndLongitude(latitude, longitude,radius);
        return ResponseEntity.ok(restaurantList);
    }

    @GetMapping("/api/v1/restaurant/user/category")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getRestaurantWithUserCategory(
            @RequestParam BigDecimal longitude, @RequestParam BigDecimal latitude,
            @RequestParam BigDecimal radius, @CurrentUser UserPrincipal userPrincipal){
        List<Restaurant> restaurants =restaurantService.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, userPrincipal.getId());
        return ResponseEntity.ok(restaurants);
    }
}
