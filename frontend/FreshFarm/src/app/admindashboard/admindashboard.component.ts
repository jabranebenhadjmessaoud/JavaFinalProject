import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  userSearchQuery: string = '';
  productSearchQuery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getallusers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Initially display all users
    });

    this.apiService.getallproducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data; // Initially display all products
    });
  }

  filterUsers() {
    const query = this.userSearchQuery.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.id.toString().includes(query) ||
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }

  filterProducts() {
    const query = this.productSearchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product =>
      product.id.toString().includes(query) ||
      product.product_title.toLowerCase().includes(query) ||
      product.price.toString().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.farming_method?.toLowerCase().includes(query)
    );
  }
}
