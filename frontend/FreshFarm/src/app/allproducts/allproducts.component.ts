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

  // ✅ Add filter properties
  selectedFilter: string = 'all'; // Default filter is "all"
  categoryQuery: string = '';
  farmingMethodQuery: string = '';
  locationQuery: string = '';

  // ✅ Define categories, farming methods, and locations dynamically
  categories: string[] = ["Vegetables", "Fruits", "Meat", "Dairy", "Herbs", "Other"];
  farmingMethods: string[] = ["Subsistence", "Plantation", "Dryland", "Wetland", "Mixed", "Organic", "Others"];
  locations: string[] = [
    "Tunis", "Sfax", "Sousse", "Ettadhamen", "Kairouan", "Gabès", "Bizerte",
    "Ariana", "Gafsa", "Monastir", "Ben Arous", "La Marsa", "Mahdia",
    "Medenine", "Nabeul", "Tataouine", "Tozeur", "Zarzis", "Hammamet",
    "Kelibia", "Beja", "Jendouba", "Kebili", "Siliana"
  ];




  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.getallproducts().subscribe((data) => {
      this.products = data;
      //i want to sort the products by date of creation latest is first
      this.products.sort((a, b) => { return <any>new Date(b.createdAt) - <any>new Date(a.createdAt) });
      this.filteredProducts = data; // Initially show all products
      //checi if the products are holding the created_at
      console.log(this.products);
    });
  }

  filterProducts() {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredProducts = this.products.filter(product => {
      const matchesSearch =
        product.product_title.toLowerCase().includes(query) ||
        product.price.toString().includes(query);

      const matchesCategory = this.selectedFilter !== 'category' || this.categoryQuery === '' || product.category === this.categoryQuery;
      const matchesFarmingMethod = this.selectedFilter !== 'farming_method' || this.farmingMethodQuery === '' || product.farming_method === this.farmingMethodQuery;
      const matchesLocation = this.selectedFilter !== 'location' || this.locationQuery === '' || product.location === this.locationQuery;

      return matchesSearch && matchesCategory && matchesFarmingMethod && matchesLocation;
    });
  }

}
