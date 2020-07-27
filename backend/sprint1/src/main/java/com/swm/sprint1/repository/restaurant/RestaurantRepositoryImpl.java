package com.swm.sprint1.repository.restaurant;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.Restaurant;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.swm.sprint1.domain.QCategory.category;
import static com.swm.sprint1.domain.QRestaurant.*;
import static com.swm.sprint1.domain.QRestaurantCategory.*;

@RequiredArgsConstructor
public class RestaurantRepositoryImpl implements RestaurantRepositoryCustom{

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Restaurant> findRestaurantByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude, BigDecimal radius) {
        return queryFactory
                .select(restaurant)
                .from(restaurant)
                .where(latitudeBetween(latitude, radius),longitudeBetween(longitude, radius))
                .limit(100)
                .fetch();
    }

    @Override
    public List<Restaurant> findRandomRestaurantByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude, BigDecimal radius) {
        return queryFactory
                .select(restaurant)
                .from(restaurant)
                .where(latitudeBetween(latitude, radius),longitudeBetween(longitude, radius))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(100)
                .fetch();
    }


    @Override
    public List<Restaurant> findRestaurantByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Category> categoryList) {
          return  queryFactory.select(restaurantCategory.restaurant)
                .from(restaurantCategory)
                .join(restaurantCategory.category, category)
                .join(restaurantCategory.restaurant, restaurant)
                .where(latitudeBetween(latitude, radius), longitudeBetween(longitude, radius), restaurantInUserCategory(categoryList)).fetch();
    }

    private BooleanExpression latitudeBetween(BigDecimal latitude, BigDecimal length){
        return latitude != null ? restaurant.latitude.between(latitude.subtract(length), latitude.add(length)) : null;
    }

    private BooleanExpression longitudeBetween(BigDecimal longitude, BigDecimal length){
        return longitude != null ? restaurant.longitude.between(longitude.subtract(length), longitude.add(length)) : null;
    }

    private BooleanExpression restaurantInUserCategory(List<Category> categoryList){
        return !categoryList.isEmpty() ? restaurantCategory.category.in(categoryList) :null;
    }
}
