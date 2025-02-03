import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../user';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile: User = {};
  user_id: any | null = null
  created_products: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.apiService.getuserbyid(this.user_id).subscribe((data) => {
      this.profile = data;
      this.created_products = data.createdProducts;
      console.log(this.created_products);
      console.log(this.profile);
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
