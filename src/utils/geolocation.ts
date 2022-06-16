import { Position } from '../types/events';

const defaultCenter = {
  lat: 53.904541,
  lng: 27.561523,
};

const getBrowserLocation = (): Promise<Position> => new Promise((resolve, reject) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        resolve({ lat, lng });
      },
      () => {
        reject(defaultCenter);
      },
    );
  } else {
    reject(defaultCenter);
  }
});

export default getBrowserLocation;
