package com.swm.sprint1.repository.user;


import com.querydsl.jpa.impl.JPAQueryFactory;

import com.swm.sprint1.domain.User;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.swm.sprint1.domain.QUser.*;


@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final  JPAQueryFactory queryFactory;

    @Override
    public List<User> findAllCustom() {
        return queryFactory.select(user)
                .from(user)
                .fetch();
    }

}
