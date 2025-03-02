import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { differenceInDays, differenceInMinutes, differenceInHours } from 'date-fns';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
  olderProducts: any[] = [];  // New array to store products older than 3 days
  searchQuery: string = '';
  searchQueryOld: string = '';  // Search query for older products

  userRole = localStorage.getItem('role');

  selectedFilter: string = 'all';
  categoryQuery: string = '';
  farmingMethodQuery: string = '';
  locationQuery: string = '';

  categories: string[] = ["Vegetables", "Fruits", "Meat", "Dairy", "Herbs", "Other"];
  farmingMethods: string[] = ["Subsistence", "Plantation", "Dryland", "Wetland", "Mixed", "Organic", "Others"];
  locations: string[] = [
    'Ariana', 'Béja'  ,  'Ben Arous' ,  'Bizerte','El Kef' , 'Gabes', 'Gafsa','Jendouba' , 'Kairouan', 'Kesserine' ,'Kebili', 'Mahdia', 'Manouba', 'Medenine','Monastir','Nabeul', 'Sfax','Sidi Bouzid', 'Siliana','Sousse','Tataouine', 'Tozeur', 'Tunis','Zaghouan'];

  // Track whether to show older products or fresh products
  showOlderProducts: boolean = false;

  constructor(private apiService: ApiService, private cartService: CartService) { }





  addToCart(product: any): void {
    console.log('Product being added:', product);
    this.cartService.addToCart(product);
    // Show a beautiful alert
    Swal.fire({
      title: 'Added to Cart!',
      text: `You added ${product.product_title} to your cart.`,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000, // Auto close in 2 seconds
      toast: true,
      position: 'top-end' // Appears at the top right
    });
  }




  ngOnInit() {
    this.apiService.getallproducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
      this.products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.filterProducts(); // Filter products to show initially
    });
  }


  // Toggle between fresh and older products
  toggleProductView() {
    this.showOlderProducts = !this.showOlderProducts;
  }

  filterProducts() {
    const query = this.searchQuery.toLowerCase().trim();
    const queryOld = this.searchQueryOld.toLowerCase().trim();

    // Filter fresh products (created within the last 3 days)
    this.filteredProducts = this.products.filter(product => {
      const productDate = new Date(product.createdAt);
      const daysAgo = differenceInDays(new Date(), productDate);

      // Matches search query and ensures the product was created in the last 3 days
      const matchesFreshProducts = daysAgo <= 3;

      const matchesSearch =
        product.product_title.toLowerCase().includes(query) ||
        product.price.toString().includes(query);

      const matchesCategory = this.selectedFilter !== 'category' || this.categoryQuery === '' || product.category === this.categoryQuery;
      const matchesFarmingMethod = this.selectedFilter !== 'farming_method' || this.farmingMethodQuery === '' || product.farming_method === this.farmingMethodQuery;
      const matchesLocation = this.selectedFilter !== 'location' || this.locationQuery === '' || product.location === this.locationQuery;

      return matchesSearch && matchesCategory && matchesFarmingMethod && matchesLocation && matchesFreshProducts;
    });

    // Filter products that are older than 3 days but not older than 6 days
    this.olderProducts = this.products.filter(product => {
      const productDate = new Date(product.createdAt);
      const daysAgo = differenceInDays(new Date(), productDate);
      const matchesOldSearch =
        product.product_title.toLowerCase().includes(queryOld) ||
        product.price.toString().includes(queryOld);

      // Ensure the product is older than 3 days and not older than 6 days
      return daysAgo > 3 && daysAgo <= 6 && matchesOldSearch;
    });
  }



  getTimeAgo(product: any): string {
    const now = new Date();
    const postDate = new Date(product.createdAt);
    const minutesAgo = differenceInMinutes(now, postDate);
    const hoursAgo = differenceInHours(now, postDate);
    const daysAgo = differenceInDays(now, postDate);

    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo < 24) {
      const remainingMinutes = minutesAgo % 60;
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ${remainingMinutes > 0 ? remainingMinutes + ' minute' + (remainingMinutes > 1 ? 's' : '') : ''} ago`;
    } else {
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
  }






}
