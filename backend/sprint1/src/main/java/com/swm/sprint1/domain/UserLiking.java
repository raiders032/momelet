package com.swm.sprint1.domain;

import com.swm.sprint1.domain.base.DateEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@NoArgsConstructor
public class UserLiking extends DateEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_liking_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(precision = 10, scale = 7)
    private BigDecimal userLongitude;

    @Column(precision = 10, scale = 7)
    private BigDecimal userLatitude;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    private Integer liking;

    @Builder
    public UserLiking(User user, BigDecimal userLongitude, BigDecimal userLatitude, Restaurant restaurant, Integer liking) {
        this.user = user;
        this.userLongitude = userLongitude;
        this.userLatitude = userLatitude;
        this.restaurant = restaurant;
        this.liking = liking;
    }

}

