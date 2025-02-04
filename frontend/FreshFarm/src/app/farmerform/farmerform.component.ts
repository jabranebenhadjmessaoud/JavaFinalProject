import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { Product } from '../product';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CloudinaryService } from '../services/cloudinary.service';

@Component({
  selector: 'app-farmerform',
  standalone: true, // If using standalone components
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, NavbarComponent],
  templateUrl: './farmerform.component.html',
  styleUrls: ['./farmerform.component.css']  // Fixed 'styleUrl' to 'styleUrls'
})
export class FarmerformComponent implements OnInit {

  data: Product = {};
  errMessage: any = {};
  userName: string | null = ''; // Use lowercase "string" for consistency
  image_url: string | null = null;
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private cloudinaryService: CloudinaryService) { }

  ngOnInit(): void {
    // Retrieve the username when the component initializes
    this.userName = localStorage.getItem('userName');
  }

  createProduct(): void {
    // Set the image URL before creating the product from cloudinary
    this.onFileSelected(event);
    this.data.image_url = this.image_url ?? undefined;
    this.apiService.createproduct(this.data).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: err => this.errMessage = err
    });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isLoading = true;
      try {
        this.image_url = await this.cloudinaryService.uploadImage(file);
        console.log(this.image_url);
      } catch (error) {
        console.error('Upload failed', error);
      }
      this.isLoading = false;
    }
  }

}
