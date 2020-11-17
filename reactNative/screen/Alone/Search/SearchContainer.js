import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';

import { apis } from '../../../api';
import SearchPresenter from './SearchPresenter';

export default ({ navigation, route }) => {
  const [userLocation, setUserLocation] = useState('');
  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});

    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    // setUserLocation({
    //   latitude: 37.5447048,
    //   longitude: 127.0663154,
    // });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return <SearchPresenter userLocation={userLocation} navigation={navigation} />;
};
