import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { LocalStorageServiceService } from '../../services/local-storage-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private locationService: LocationService,private ls: LocalStorageServiceService) {}
Contacts:any = [];
openLocation()
{
  this.router.navigate(["location"])
}
openContacts()
{
  this.router.navigate(["contacts"])
}
async SOS()
{
  try {
    const { latitude, longitude } = await this.locationService.getUserLocation();
    
    const message = `SOS! My current location is: https://www.google.com/maps?q=${latitude},${longitude}`;
    this.Contacts = this.ls.getAll('contacts');
    if (this.Contacts.length === 0) {
      alert("No contacts found to send SOS.");
      return;
    }
    //list of contact numbers for SMS
    const numbers = this.Contacts.map((contact:{number: string}) => contact.number.replace(/\D/g, '')).join(','); 
   
    //SMS URL
    const smsUrl = `sms:${numbers}?body=${encodeURIComponent(message)}`;
   
    //send to  SMS app with pre-filled message and contacts
    window.location.href = smsUrl; 
    }
  catch (error) {
    console.error("Error getting location:", error);
    alert("Unable to retrieve location.");
  }
}
}
