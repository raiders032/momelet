package com.swm.sprint1.repository.restaurant;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.swm.sprint1.domain.Category;
import com.swm.sprint1.domain.Restaurant;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponse;
import com.swm.sprint1.payload.response.RetrieveRestaurantResponseV1;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.util.List;

import static com.swm.sprint1.domain.QCategory.category;
import static com.swm.sprint1.domain.QRestaurant.*;
import static com.swm.sprint1.domain.QRestaurantCategory.*;

@RequiredArgsConstructor
public class RestaurantRepositoryImpl implements RestaurantRepositoryCustom{

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;
    private final JpaResultMapper jpaResultMapper;

    @Override
    public List<RetrieveRestaurantResponseV1> findRetrieveRestaurantByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Category> categoryList) {
       return queryFactory.select(Projections.fields(RetrieveRestaurantResponseV1.class,
                restaurant.id, restaurant.name, restaurant.thumUrl ,restaurant.address, restaurant.roadAddress
                , restaurant.googleId, restaurant.naverId, restaurant.googleRating, restaurant.openingHours
                , restaurant.priceLevel, restaurant.longitude, restaurant.latitude
                , ExpressionUtils.as( Expressions.stringTemplate("function('group_concat', {0})", category.name),"categories")))
                .from(restaurantCategory)
                .join(restaurantCategory.category, category)
                .join(restaurantCategory.restaurant, restaurant)
                .where(latitudeBetween(latitude, radius), longitudeBetween(longitude, radius), restaurantInUserCategory(categoryList))
                .groupBy(restaurant.id)
                .fetch();
    }

    @Override
    public List<RetrieveRestaurantResponse> findRetrieveRestaurantResponseByLatitudeAndLongitudeAndUserCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long id) {
        String sql =
                "   select r.restaurant_id, r.name, r.thum_url, group_concat(c.name order by c.category_id) as categories, " +
                        " r.google_rating, r.google_review_count, r.opening_hours, r.price_level, r.address, r.road_address, " +
                        " r.longitude, r.latitude, r.naver_id, r.google_id, r.phone_number " +
                "   from( " +
                "       select restaurant.* " +
                "       from restaurant  " +
                "       where (restaurant.latitude between ? and ?) and (restaurant.longitude between ? and ?)) r " +
                "   join restaurant_category rc on r.restaurant_id = rc.restaurant_id " +
                "   join category c on rc.category_id = c.category_id " +
                "   where r.restaurant_id in ( " +
                "       select rc.restaurant_id " +
                "       from restaurant_category rc " +
                "       where rc.category_id in ( " +
                "           select user_category.category_id " +
                "           from user_category " +
                "           where user_category.user_id = ? ) " +
                "       group by rc.restaurant_id) " +
                "   group by r.restaurant_id" +
                        " order by r.google_rating ";
        Query query = em.createNativeQuery(sql)
                .setParameter(1, latitude.subtract(radius))
                .setParameter(2, latitude.add(radius))
                .setParameter(3, longitude.subtract(radius))
                .setParameter(4, longitude.add(radius))
                .setParameter(5, id);
        return jpaResultMapper.list(query, RetrieveRestaurantResponse.class);
    }

    @Override
    public List<Restaurant> findByLatitudeAndLongitudeAndCategories(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Category> categoryList) {
        return queryFactory.select(restaurant)
                .from(restaurantCategory)
                .join(restaurantCategory.category, category)
                .join(restaurantCategory.restaurant, restaurant)
                .where(latitudeBetween(latitude, radius), longitudeBetween(longitude, radius), restaurantInUserCategory(categoryList))
                .groupBy(restaurant.id)
                .orderBy(restaurant.googleRating.desc())
                .limit(100)
                .fetch();
    }

    @Override
    public List<Restaurant> findByLatitudeAndLongitudeAndCategory(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, Long category_id, Long limit) {
        return queryFactory.select(restaurant)
                .from(restaurant)
                .join(restaurant.restaurantCategories, restaurantCategory).fetchJoin()
                .join(restaurantCategory.category, category).fetchJoin()
                .where(restaurantCategory.category.id.eq(category_id), longitudeBetween(longitude,radius), latitudeBetween(latitude,radius))
                .limit(limit)
                .orderBy(restaurant.googleRating.desc())
                .fetch();
    }

    @Override
    public List<?> findtest(BigDecimal latitude, BigDecimal longitude, BigDecimal radius, List<Long> ids, List<String> categoryList) {
        String sql =
                "   SELECT c.category_id, c.name, rnum  " +
                "   FROM (  " +
                "       SELECT " +
                "           a.*, " +
                "           (CASE @vcar WHEN a.category_id THEN @rownum:=@rownum+1 ELSE @rownum:=1 END) rnum, " +
                "           (@vcar:=a.category_id) " +
                "       FROM(  " +
                "           SELECT rc.*, r.name " +
                "           FROM restaurant r " +
                "           JOIN restaurant_category rc on r.restaurant_id = rc.restaurant_id " +
                "           WHERE rc.category_id in(1,2,3,4)) a, (SELECT @vcar:= 0, @rownum:= 0 FROM DUAL) b " +
                "           ORDER BY a.category_id " +
                "           ) c  " +
                "   WHERE c.rnum <=(select count(uc.category_id) " +
                "                   from user_category uc " +
                "                   where uc.category_id = c.category_id  " +
                "                   and uc.user_id in (1,4) " +
                "                   group by uc.category_id) * 2 ";
        return em.createNativeQuery(sql)
                .setParameter("categories",categoryList)
                .setParameter("ids",ids)
                .getResultList();
    }


    private BooleanExpression latitudeBetween(BigDecimal latitude, BigDecimal length){
        return latitude != null ? restaurant.latitude.between(latitude.subtract(length), latitude.add(length)) : null;
    }

    private BooleanExpression longitudeBetween(BigDecimal longitude, BigDecimal length){
        return longitude != null ? restaurant.longitude.between(longitude.subtract(length), longitude.add(length)) : null;
    }

    private BooleanExpression restaurantInUserCategory(List<Category> categoryList){
        return !categoryList.isEmpty() ? restaurantCategory.category.in(categoryList) : null;
    }
}
