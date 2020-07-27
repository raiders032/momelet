package com.swm.sprint1.repository.user;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.swm.sprint1.domain.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.swm.sprint1.domain.QCategory.*;
import static com.swm.sprint1.domain.QUserCategory.*;


@RequiredArgsConstructor
public class UserCategoryRepositoryImpl implements UserCategoryRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Category> findCategoryByUserId(Long userId) {
        return  queryFactory.select(category)
                .from(userCategory)
                .where(userCategory.user.id.eq(userId))
                .fetch();
    }

    @Override
    public List<String> findCategoryNameByUserId(Long userId) {
        return  queryFactory.select(category.name)
                .from(userCategory)
                .join(userCategory.category, category)
                .where(userCategory.user.id.eq(userId))
                .fetch();
    }

    @Override
    public long deleteUserCategory(Long userId) {
        return queryFactory.delete(userCategory).where(userCategory.user.id.eq(userId)).execute();
    }


}
