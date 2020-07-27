package com.swm.sprint1.repository;

import com.swm.sprint1.domain.Category;

import java.util.List;

public interface CategoryRepositoryCustom {
    List<Category> findCategoryByCategoryName(List<String> categories);
}
