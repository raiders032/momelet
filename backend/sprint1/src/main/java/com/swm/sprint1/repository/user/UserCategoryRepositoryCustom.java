package com.swm.sprint1.repository.user;

import com.swm.sprint1.domain.Category;

import java.util.List;
import java.util.Map;

public interface UserCategoryRepositoryCustom {
    List<Category> findCategoryByUserId(Long userId);

    List<String> findCategoryNameByUserId(Long userId);

    Map<String,Integer> findAllCategoryNameByUserId(Long userId);
}
