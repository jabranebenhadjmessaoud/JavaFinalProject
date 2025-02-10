import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../api.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-loginform',
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  data: User = {};
  errMessage: string = "";
  submitted: boolean = false; // Track if form was submitted

  constructor(private apiService: ApiService, private router: Router) { }

  authenticate(): void {
    this.submitted = true; // Mark as submitted

    if (!this.data.email || !this.data.password) {
      this.errMessage = "Email/Password is wrong!";
      return;
    }

    this.apiService.authenticate(this.data).subscribe({
      next: (res) => {
        console.log("logIn");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user_id", res.id);
        localStorage.setItem("role", res.role);
        localStorage.setItem("userName", res.fullName);
        localStorage.setItem("image", res.image_url);
        localStorage.setItem("user_stat", res.user_stat);

        if (localStorage.getItem("user_stat") == "ACTIVE") {
          this.router.navigate(["/"]);
        }
        if (localStorage.getItem("user_stat") == "BANNED") {
          this.router.navigate(["/"]);
        }
      },
      error: (err) => {
        this.errMessage = err.error?.message || "Email/Password is wrong!";
      },
    });
  }
}
