package com.swm.sprint1.controller;

import com.swm.sprint1.payload.response.RetrieveRestaurantResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;
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

    private final RestaurantService restaurantService;

    @GetMapping("/api/v1/restaurants")
    public ResponseEntity<?> getRestaurant(@RequestParam BigDecimal longitude, @RequestParam BigDecimal latitude,@RequestParam BigDecimal radius){
        List<RetrieveRestaurantResponseV1> restaurantList =restaurantService.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude,radius, null);
        return ResponseEntity.ok(restaurantList);
    }

    @GetMapping("/api/v1/restaurants/users/categories")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getRestaurantWithUserCategory(
            @RequestParam BigDecimal longitude, @RequestParam BigDecimal latitude,
            @RequestParam BigDecimal radius, @CurrentUser UserPrincipal userPrincipal){
        List<RetrieveRestaurantResponseV1> restaurants = restaurantService.findRestaurantByLatitudeAndLongitudeAndUserCategory(latitude, longitude, radius, userPrincipal.getId());
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/api/v2/restaurants/users/categories")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getRestaurantWithUserCategoryV2(
            @RequestParam BigDecimal longitude, @RequestParam BigDecimal latitude,
            @RequestParam BigDecimal radius, @CurrentUser UserPrincipal userPrincipal){
        List<RetrieveRestaurantResponse> restaurants = restaurantService.findRestaurantByLatitudeAndLongitudeAndUserCategoryV2(latitude, longitude, radius, userPrincipal.getId());
        return ResponseEntity.ok(restaurants);
    }
}
