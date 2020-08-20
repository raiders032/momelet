package com.swm.sprint1.payload.response;

import com.swm.sprint1.domain.Menu;
import com.swm.sprint1.domain.Restaurant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
public class RetrieveRestaurantResponse {
    private BigInteger id;
    private String name;
    private String thumUrl;
    private String menu;
    private String categories;
    private BigDecimal googleRating;
    private Integer googleReviewCount;
    private String openingHours;
    private Integer priceLevel;
    private String address;
    private String roadAddress;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private BigInteger naverId;
    private BigInteger googleId;
    private String phoneNumber;

    public RetrieveRestaurantResponse(BigInteger id, String name, String thumUrl, String menu, String categories, BigDecimal googleRating, Integer googleReviewCount, String openingHours, Integer priceLevel, String address, String roadAddress, BigDecimal longitude, BigDecimal latitude, BigInteger naverId, BigInteger googleId, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.thumUrl = thumUrl;
        this.menu = menu;
        this.categories = categories;
        this.googleRating = googleRating;
        this.googleReviewCount = googleReviewCount;
        this.openingHours = openingHours;
        this.priceLevel = priceLevel;
        this.address = address;
        this.roadAddress = roadAddress;
        this.longitude = longitude;
        this.latitude = latitude;
        this.naverId = naverId;
        this.googleId = googleId;
        this.phoneNumber = phoneNumber;
    }

    public RetrieveRestaurantResponse(Restaurant restaurant){
        this.id = BigInteger.valueOf(restaurant.getId());
        this.name = restaurant.getName() ;
        this.thumUrl = restaurant.getThumUrl();
        this.googleRating = restaurant.getGoogleRating();
        this.googleReviewCount = restaurant.getGoogleReviewCount();
        this.openingHours = restaurant.getOpeningHours();
        this.priceLevel = restaurant.getPriceLevel();
        this.address = restaurant.getAddress();
        this.roadAddress = restaurant.getRoadAddress();
        this.longitude = restaurant.getLongitude();
        this.latitude = restaurant.getLatitude();
        this.naverId = BigInteger.valueOf(restaurant.getNaverId());
        this.googleId = null;
        this.phoneNumber = restaurant.getPhoneNumber();
        this.categories = restaurant
                .getRestaurantCategories().stream()
                .map(restaurantCategory -> { return restaurantCategory.getCategory().getName();})
                .collect(Collectors.joining(","));
        this.menu = restaurant.getMenuList()
                .stream().map(menu1 -> menu1.getName() + " : " + menu1.getPrice())
                .collect(Collectors.joining(" | "));
    }
}
