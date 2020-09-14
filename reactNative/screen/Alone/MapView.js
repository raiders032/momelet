import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default ({ route }) => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    //임시로 사용
    const latitude = 37.5447048;
    const longitude = 127.0663154;

    setUserLocation({ lat: latitude, lng: longitude });
    console.log(location);
  };

  useEffect(() => {
    getUserLocation();

    return () => {
      setUserLocation(null);
    };
  }, []);

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      initialRegion={{
        latitude: route.params.lat,
        longitude: route.params.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Marker coordinate={{ latitude: route.params.lat, longitude: route.params.lng }} />
      <Marker coordinate={{ latitude: userLocation.lat, longitude: userLocation.lng }} />
    </MapView>
  );
};
