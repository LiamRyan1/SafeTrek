import { Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LocationComponent } from './components/location/location.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
{path:"contacts",component:ContactsComponent},
{path:"location",component:LocationComponent},
{path:"home",component:HomeComponent}

];
