import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  constructor(private router: Router) {}
  openHome()
  {
    this.router.navigate(['home'])
  }
}
