import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  constructor(private router: Router,private locationService: LocationService) {}
  map: L.Map | undefined;  //instance of map
  userMarker: L.Marker | undefined;  //instance of location
  address: string = "Fetching location...";


  ngAfterViewInit(): void {
    if (!this.map) { //initialise map if it hasnt been created
      this.initMap();
    }
  }

  private async initMap(): Promise<void> {
   //set map to zoom 15
    this.map = L.map('map').setView([0, 0], 15); 

      //add openstreetmap tiles to layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(this.map);

    try {
      //get users corordinates
      const { latitude, longitude } = await this.locationService.getUserLocation();
      //create marker and set location on map
      const marker = L.marker([latitude, longitude]);
      this.map.setView([latitude, longitude], 15);
      marker.addTo(this.map);

      //fetch the address to display as title
      this.address = await this.locationService.getAddress(latitude, longitude);
    } catch (error) {
      this.address =  String(error); 
    }
  }
  openHome()
  {
    this.router.navigate(["home"])
  }
  
}
