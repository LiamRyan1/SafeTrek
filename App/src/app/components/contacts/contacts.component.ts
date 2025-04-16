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
  name:string = "";
  Number:string = "";
  Email:string = "";

  editName: string = "";
  editNumber: string = "";
  editEmail: string = "";

  EditingContact:any ;
  EditOnOff: Boolean = false;

  Contacts:any = [];
  ngOnInit(){
    this.Contacts = this.ls.getAll("contacts");
  }
  openHome()
  {
    this.router.navigate(["home"])
  }
  onSave()
  {
    if (this.Number.length !== 10 || !/^\d+$/.test(this.Number)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    if (this.Email && !this.Email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if(this.name != "" && this.Number != "" )
    {
      //create a new Contact object
      const newContact = {
      name: this.name,
      number: this.Number,
      email: this.Email
      }
      const duplicate = this.Contacts.some((contact:any) =>
        contact.number === newContact.number ||
        (newContact.email && contact.email?.toLowerCase() === newContact.email.toLowerCase())
      );

      if (duplicate) {
        alert("Contact already exists with the same name, number, or email.");
        return;
      }
      //push new contact to array
      this.Contacts.push(newContact);
      
      //store contacts as an array in local storage
      this.ls.storeArray(this.Contacts);

      //reset form
      this.onResetForm();
      this.cdRef.detectChanges();
      console.log(this.Contacts);
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
    this.editName = contact.name;
    this.editNumber  = contact.number;
    this.editEmail  = contact.email;
    this.EditOnOff = true;
    this.EditingContact= contact;
  }

  onResetForm()
  {
    this.name = "";
    this.Number = "";
    this.Email = "";
  }

  onSaveEdit() {
    if (this.editName && this.editNumber) {
      // Update the contact object
      this.EditingContact.name = this.editName;
      this.EditingContact.number = this.editNumber;
      this.EditingContact.email = this.editEmail;

      // Save updated contacts back to local storage
      this.ls.storeArray(this.Contacts);

      // Close modal
      this.EditOnOff = false;
      this.EditingContact = null;
    } else {
      alert("Please fill out required information");
    }
  }

  onCancelEdit() {
    this.EditOnOff = false;
    this.EditingContact = null;
  }

}

