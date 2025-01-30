import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    console.log("ngOnInit called"); // Check if ngOnInit is called

    const userId = localStorage.getItem('user_id');
    console.log("userId from localStorage:", userId); // Log the retrieved userId

    if (!userId) {
      console.log("Redirecting to login page");
      this.router.navigate(['/authentication']);
    }
  }

}
