package com.swm.sprint1.controller;

import com.swm.sprint1.exception.BadRequestException;
import com.swm.sprint1.payload.response.ApiResponse;
import com.swm.sprint1.payload.response.RestaurantDtoResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;
import com.swm.sprint1.security.CurrentUser;
import com.swm.sprint1.security.UserPrincipal;
import com.swm.sprint1.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/api/v1/restaurants")
    public ResponseEntity<?> getRestaurant(@RequestParam BigDecimal longitude,
                                           @RequestParam BigDecimal latitude,
                                           @RequestParam BigDecimal radius){
        List<RetrieveRestaurantResponseV1> restaurantList = restaurantService.findRestaurantByLatitudeAndLongitudeAndUserCategoryV1(latitude, longitude, radius, null);
        return ResponseEntity.ok(restaurantList);
    }

    @GetMapping("/api/v1/restaurants/users/{id}/categories")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getRestaurantWithUserCategory(@CurrentUser UserPrincipal userPrincipal,
                                                           @RequestParam BigDecimal longitude,
                                                           @RequestParam BigDecimal latitude,
                                                           @RequestParam BigDecimal radius,
                                                           @PathVariable Long id){
        if(!id.equals(userPrincipal.getId()))
            throw new BadRequestException("유효하지 않은 id : " + id);
        List<RetrieveRestaurantResponseV1> restaurants = restaurantService.findRestaurantByLatitudeAndLongitudeAndUserCategoryV1(latitude, longitude, radius, userPrincipal.getId());
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/api/v2/restaurants/users/{id}/categories")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getRestaurantWithUserCategoryV2(@CurrentUser UserPrincipal userPrincipal,
                                                             @RequestParam BigDecimal longitude,
                                                             @RequestParam BigDecimal latitude,
                                                             @RequestParam BigDecimal radius,
                                                             @PathVariable Long id){
        if(!id.equals(userPrincipal.getId()))
            throw new BadRequestException("유효하지 않은 id : " + id);

        List<RestaurantDtoResponse> restaurants = restaurantService.findRestaurantDtoResponse(latitude, longitude, radius, userPrincipal.getId());
        ApiResponse response = new ApiResponse(true);
        response.putData("restaurants", restaurants);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v1/restaurants7")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getRestaurant7SimpleCategoryBased(@RequestParam String id,
                                                               @RequestParam BigDecimal longitude,
                                                               @RequestParam BigDecimal latitude,
                                                               @RequestParam BigDecimal radius){
        List<Long> ids = Arrays.stream(id.split(",")).map(Long::parseLong).collect(Collectors.toList());
        List<RestaurantDtoResponse> restaurants = restaurantService.findRestaurant7SimpleCategoryBased(ids,longitude,latitude,radius);

        ApiResponse response = new ApiResponse(true);
        response.putData("restaurants", restaurants);

        return ResponseEntity.ok(response);
    }
}
