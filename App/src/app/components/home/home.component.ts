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
showEmailButton:boolean = false;
emailUrl:string= "";
openLocation()
{
  this.router.navigate(["location"])
}
openContacts()
{
  this.router.navigate(["contacts"])
}
openEmail() {
  window.open(this.emailUrl, '_blank');
  this.showEmailButton = false; // optional: hide it after clicking
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
    const numbers = this.Contacts.map((contact:{number: string}) => contact.number.replace(/\D/g,'')).join(','); 
   
    //SMS URL
    const smsUrl = `sms:${numbers}?body=${encodeURIComponent(message)}`;
   
    //send to  SMS app with pre-filled message and contacts
    window.location.href = smsUrl; 

    //ask if sms was sent after 3 second delay
    setTimeout(() => {
      const Emailbackup = window.confirm("Did the SMS send? Do you want to send this via Email?");
      if (Emailbackup) {
        
        //get all saved emails
        const emailAddresses = this.Contacts.map((contact: { email?: string }) => contact.email).filter(Boolean).join(',');
        if (!emailAddresses) {
          alert("No email addresses found in contacts.");
          return;
        }
  
        const subject = "SOS - Need Help";
        this.emailUrl = `mailto:${emailAddresses}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        this.showEmailButton = true;
      }
    }, 3000); 
  
  }
  catch (error) {
    console.error("Error getting location:", error);
    alert("Unable to retrieve location.");
  }
}
}
