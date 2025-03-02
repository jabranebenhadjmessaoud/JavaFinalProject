import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user';
import { NavbarComponent } from '../navbar/navbar.component';
import { CloudinaryService } from '../services/cloudinary.service';
import { on } from 'events';

@Component({
  selector: 'app-registerform',
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  data: User = {};
  errMessage: string = "";
  submitted: boolean = false; // Track if form was submitted
  image_url: string | null = null;
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private cloudinaryService: CloudinaryService) { }

  register(): void {
    this.submitted = true; // Mark form as submitted

    if (!this.data.email || !this.data.password || !this.data.fullName) {
      this.errMessage = "Please fill in all required fields!";
      return;
    }

    if (this.isLoading) {
      console.log("Image upload is in progress, please wait...");
      return;
    }

    this.apiService.register(this.data).subscribe({
      next: (res) => {
        console.log("Registered successfully");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user_id", res.id);
        localStorage.setItem("role", res.role);
        localStorage.setItem("userName", res.fullName);
        localStorage.setItem("image", res.image_url);
        localStorage.setItem("user_stat", res.user_stat);

        const role = res.role;
        if (role === "ROLE_FARMER" || role === "ROLE_CLIENT") {
          this.router.navigate(["/"]);
        } else if (role === "ROLE_ADMIN") {
          this.router.navigate(["/admin"]);
        }
      },
      error: (err) => {
        this.errMessage = err.error?.message || "Registration failed. Please try again!";
      },
    });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isLoading = true;
      try {
        // Upload the image and set image_url
        this.image_url = await this.cloudinaryService.uploadImage(file);
        this.data.image_url = this.image_url; // Ensure data object is updated
        console.log("Image URL:", this.image_url);
      } catch (error) {
        console.error("Upload failed", error);
      }
      this.isLoading = false;
    }
  }
}
