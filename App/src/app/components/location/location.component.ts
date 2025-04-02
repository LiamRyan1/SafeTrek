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
  map: L.Map | undefined;  
  userMarker: L.Marker | undefined; 
  address: string = "Fetching location...";


  ngAfterViewInit(): void {
    if (!this.map) {
      this.initMap();
    }
  }

  private async initMap(): Promise<void> {
   
    this.map = L.map('map').setView([0, 0], 15); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    try {
      const { latitude, longitude } = await this.locationService.getUserLocation();
      this.map.setView([latitude, longitude], 15);
      this.address = await this.locationService.getAddress(latitude, longitude);
    } catch (error) {
      this.address = error as string;
    }
  }
  openHome()
  {
    this.router.navigate(['home'])
  }
  
}
