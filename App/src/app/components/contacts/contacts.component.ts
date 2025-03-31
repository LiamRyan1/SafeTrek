import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contacts',
  imports: [FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  constructor(private router: Router) {}
  name:String = "";
  Number:String = "";
  Email:String = "";
  savedName:String ="";
  savedNumber:String = "";

  openHome()
  {
    this.router.navigate(['home'])
  }
  onSave()
  {
    alert("OnSave()");
    if(this.name != "" && this.Number >= "" )
    {
      this.savedName = this.name;
      this.savedNumber = this.Number;
    }
    this.name = "";
    this.Number = "";
  }
  onResetForm()
  {
    alert("onResetForm()");
    this.name = "";
    this.Number = "";
  }
 
}
