import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
openLocation()
{
  this.router.navigate(['location'])
}
openContacts()
{
  this.router.navigate(['contacts'])
}
SOS()
{
  alert("SOS messages sent")
}
}
