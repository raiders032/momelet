package com.swm.sprint1.repository.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserLikingRepositoryImpl implements UserLikingRepositoryCustom{

    private final JPAQueryFactory queryFactory;

}
