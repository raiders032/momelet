import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { apis } from '../api';
import Basic from '../component/Basic';
import RestaurantCard from '../component/RestaurantCard';

export default ({ route }) => {
  const [restaurant, setRestaurant] = useState(null);
  const getRestaurant = async () => {
    if (route.params.fromSearch) {
      setRestaurant(route.params.restaurant);
    } else {
      const result = await apis.getRestaurantById(route.params.restaurant.restaurantId);

      // console.log('ab', result.data.data.restaurant);
      setRestaurant(result.data.data.restaurant);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  if (restaurant != null) {
    return (
      <Basic>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <RestaurantCard
            cardStyle={{ width: '90%', height: '90%' }}
            restaurant={restaurant}
            isSelected={route.params.fromSearch ? false : route.params.isSelected}
            userLocation={route.params.userLocation}
            fromHome={false}
            from={route.params.from}
          />
        </View>
      </Basic>
    );
  } else {
    return <View />;
  }
};
