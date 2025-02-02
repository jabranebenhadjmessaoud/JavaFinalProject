import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminproducts',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './adminproducts.component.html',
  styleUrl: './adminproducts.component.css'
})
export class AdminproductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  productSearchQuery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getallproducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data; // Initially display all products
    });
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
