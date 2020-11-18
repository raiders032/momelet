import HaversineGeolocation from 'haversine-geolocation';

export const calculateDistance = (target, source) => {
  const distanceByM = Math.round(
    (HaversineGeolocation.getDistanceBetween(target, source, 'm') / 10) * 10
  );

  // if (distanceByM > 1000) {
  //   return (Math.round(distanceByM / 100) / 10).toString() + 'KM';
  // }

  return distanceByM.toString() + 'M';
};
