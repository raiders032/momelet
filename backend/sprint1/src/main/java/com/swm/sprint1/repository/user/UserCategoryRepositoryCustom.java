package com.swm.sprint1.repository.user;

import com.querydsl.core.Tuple;
import com.swm.sprint1.domain.Category;
import com.swm.sprint1.service.RestaurantService;

import java.util.List;
import java.util.Map;

public interface UserCategoryRepositoryCustom {
    List<Category> findCategoryByUserId(Long userId);

    List<String> findCategoryNameByUserId(Long userId);

    Map<String,Integer> findAllCategoryNameByUserId(Long userId);

    List<RestaurantService.CategoryCount> findCategoryAndCountByUserId(List<Long> ids);
}
