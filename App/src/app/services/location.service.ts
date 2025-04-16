import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  //get location via geoloaction api
  getUserLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        //try get position if browser supports
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject('Location access denied.');
          }
        );
      } else {
        reject('Geolocation not supported.');
      }
    });
  }

    //change coordinates to readable addresses
  async getAddress(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
      //send requestion to open street map nominatim url 
      const response = await fetch(url);
      const data = await response.json();
      //return the display name or backup msg
      return data.display_name || 'Address not found';
    } catch (error) {
      return 'Failed to fetch address';
    }
  }
}

