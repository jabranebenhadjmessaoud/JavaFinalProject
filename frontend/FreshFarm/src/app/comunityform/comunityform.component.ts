import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Post } from '../post';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../services/cloudinary.service';

@Component({
  selector: 'app-comunityform',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, NavbarComponent],
  templateUrl: './comunityform.component.html',
  styleUrl: './comunityform.component.css'
})
export class ComunityformComponent {

  data: Post = {};
  errMessage: any = {};
  userName: string | null = '';
  image_url: string | null = null;
  isLoading: boolean = false;


  constructor(private apiService: ApiService, private router: Router, private cloudinaryService: CloudinaryService) { }

  ngOnInit(): void {
    // Retrieve the username when the component initializes
    this.userName = localStorage.getItem('userName');
  }

  createPost(): void {
    this.onFileSelected(event);
    this.data.image_url = this.image_url ?? undefined;
    this.apiService.createpost(this.data).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: err => this.errMessage = err
    })
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
