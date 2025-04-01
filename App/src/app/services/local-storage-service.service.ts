import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor(private ls: LocalStorageService) { }
  public set(key:string, contact: { name: string, number: string, email: string }){
    this.ls.set(key,contact);
  }
  public storeArray(contacts:any[])
  {
    this.ls.set('contacts',contacts);
  }
  public get(key:string){
    return this.ls.get(key);
  }
  public getAll(key:string){
    return this.ls.get('contacts') || [];
  }
  public deleteContact(contact: any)
  {
    let Contacts = this.ls.get('contacts') || [];
    Contacts = Contacts.filter((c: { name: string, number: string, email: string }) =>
      c.name !== contact.name || c.number !== contact.number || c.email !== contact.email
    );
    this.ls.set('contacts', Contacts);
  }

 
}
