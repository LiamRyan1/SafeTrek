import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'App';
  constructor(private router:Router){
   
  }
  ngOnInit(){
    console.log("ngOnit")
    this.router.navigate(['home'])
  }
}
