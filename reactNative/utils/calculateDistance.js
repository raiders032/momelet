import HaversineGeolocation from 'haversine-geolocation';

export const calculateDistance = (target, source) => {
  const distanceByM = HaversineGeolocation.getDistanceBetween(target, source, 'm');

  return (Math.round(distanceByM / 10) * 10).toString() + 'M';
};
