import { Component,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../../services/local-storage-service.service'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contacts',
  imports: [FormsModule,CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  constructor(private router: Router,private ls: LocalStorageServiceService, private cdRef: ChangeDetectorRef ) {}
  name:String = "";
  Number:String = "";
  Email:String = "";
 

  Contacts:any
  ngOnInit(){
    this.Contacts = this.ls.getAll('contacts');
  }
  openHome()
  {
    this.router.navigate(['home'])
  }
  onSave()
  {
    if(this.name != "" && this.Number != "" )
    {
      //create a new Contact object
      const newContact = {
        name: this.name,
        number: this.Number,
        email: this.Email
      };
      //get previously saved contacts
      let myContact = this.ls.getAll('contacts');
      //push new contact to array
      myContact.push(newContact);
      //store contacts as an array in local storage
      this.ls.storeArray(myContact);

      //reset form
      this.name = "";
      this.Number = "";
      this.Email = "";
      
      this.Contacts = this.ls.getAll('contacts');
      this.cdRef.detectChanges();
      console.log(myContact)
    }
    else{
      alert("Please fill out required information")
    }
  }
  DeleteContact(contact:any){
    this.ls.deleteContact(contact);
    console.log("ran it");
    this.Contacts = this.ls.getAll('contacts');
    console.log(this.Contacts);
  }
  EditContact(contact:any){

  }
  onResetForm()
  {
    alert("onResetForm()");
    this.name = "";
    this.Number = "";
    this.Email = "";
  }
  
}
