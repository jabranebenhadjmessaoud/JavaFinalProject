import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getallproducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data; // Initially show all products
    });
  }

  filterProducts() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product =>
      product.product_title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.farming_method?.toLowerCase().includes(query) ||
      product.price.toString().includes(query)
    );
  }
}
