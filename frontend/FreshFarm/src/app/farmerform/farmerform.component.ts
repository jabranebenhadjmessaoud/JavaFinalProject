import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { Product } from '../product';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve the username when the component initializes
    this.userName = localStorage.getItem('userName');
  }

  createProduct(): void {
    this.apiService.createproduct(this.data).subscribe({
      next: (res) => {
        this.router.navigate(['/homepage']);
      },
      error: err => this.errMessage = err
    });
  }
}
