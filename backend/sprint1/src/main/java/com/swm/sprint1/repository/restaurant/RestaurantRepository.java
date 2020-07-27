package com.swm.sprint1.repository.restaurant;

import com.swm.sprint1.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;



public interface RestaurantRepository extends JpaRepository<Restaurant,Long>, RestaurantRepositoryCustom {

}
