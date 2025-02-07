import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { differenceInDays, differenceInMinutes, differenceInHours } from 'date-fns';
import { AdminusersComponent } from "../adminusers/adminusers.component";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  posts: any[] = [];
  filteredPosts: any[] = [];

  reports: any[] = [];
  filteredReports: any[] = [];

  userSearchQuery: string = '';
  productSearchQuery: string = '';
  postSearchQuery: string = '';
  reportSearchQuery: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getallusers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Initially display all users
    });

    this.apiService.getallproducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data; // Initially display all products
    });

    this.apiService.getallposts().subscribe((data) => {
      this.posts = data;
      this.filteredPosts = data; // Initially display all products
    });

    this.apiService.getAllReports().subscribe((data) => {
      this.reports = data;
      this.filteredReports = data; // Initially display all reports
      console.log(this.reports);
    });
  }

  filterUsers() {
    const query = this.userSearchQuery.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.id.toString().includes(query) ||
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.user_stat.toLowerCase().includes(query)
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

  filterPosts() {
    const query = this.postSearchQuery.toLowerCase().trim();
    this.filteredPosts = this.posts.filter(post =>
      post.id.toString().includes(query) ||
      post.post_title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
      //add author to post
      // ||
      // post.author.toLowerCase().includes(query)
    );
  }
  loadUsers() {
    this.apiService.getallusers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  //ban farmer
  banFarmer(user: any) {
    if (confirm(`Are you sure you want to ban ${user.fullName}?`)) {
      this.apiService.banFarmer(user.id).subscribe(() => {
        user.banned = true;
        Swal.fire({
          title: '🚫 User Banned!',
          text: 'The user has been banned successfully.',
          icon: 'error', // Red error icon
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33', // Red button
          backdrop: true,
          timer: 3000, // Auto close after 3 seconds
        });
        this.loadUsers();
      });
    }
  }
  //unban farmer
  unbanFarmer(user: any) {
    if (confirm(`Are you sure you want to unban ${user.fullName}?`)) {
      this.apiService.unbanFarmer(user.id).subscribe(() => {
        user.banned = true;
        Swal.fire({
          title: '✅ User Unbanned!',
          text: 'The user has been unbanned successfully.',
          icon: 'success', // Green success icon
          confirmButtonText: 'OK',
          confirmButtonColor: '#28a745', // Green button
          backdrop: true,
          timer: 3000, // Auto close after 3 seconds
        });
        this.loadUsers();
      });
    }
  }

  filterReports() {
    const query = this.reportSearchQuery.toLowerCase().trim();
    this.filteredReports = this.reports.filter(report =>
      report.id.toString().includes(query) ||
      report.reportContent.toLowerCase().includes(query) ||
      report.productReportedBy.fullName.toLowerCase().includes(query) ||
      report.productsReports.product_title.toLowerCase().includes(query)
    );
  }

  getTimeAgo(post: any): string {
    const now = new Date();
    const postDate = new Date(post.createdAt);
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
