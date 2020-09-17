package com.swm.sprint1.service;

import com.swm.sprint1.domain.Restaurant;
import com.swm.sprint1.domain.User;
import com.swm.sprint1.domain.UserLiking;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.payload.request.CreateUserLikingDto;
import com.swm.sprint1.repository.restaurant.RestaurantRepository;
import com.swm.sprint1.repository.user.UserLikingRepository;
import com.swm.sprint1.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserLikingService {
    private final UserLikingRepository userLikingRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final Logger logger = LoggerFactory.getLogger(UserLikingService.class);

    @Transactional
    public void saveUserLiking(Long userId, CreateUserLikingDto userLikingDto) {
        logger.debug("saveUserLiking 호출됨");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", userId, "200"));

        Restaurant restaurant = restaurantRepository.findById(userLikingDto.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("restaurant", "id", userLikingDto.getRestaurantId(), "210"));

        UserLiking userLiking = UserLiking.builder()
                .liking(userLikingDto.getLiking())
                .restaurant(restaurant)
                .user(user)
                .userLatitude(userLikingDto.getUserLatitude())
                .userLongitude(userLikingDto.getUserLongitude())
                .build();

        userLikingRepository.save(userLiking);
    }
}
