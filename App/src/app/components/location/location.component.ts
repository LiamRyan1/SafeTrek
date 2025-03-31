import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  constructor(private router: Router) {}
  openHome()
  {
    this.router.navigate(['home'])
  }
}
