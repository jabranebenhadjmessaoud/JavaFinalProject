import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-amdminorders',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './amdminorders.component.html',
  styleUrl: './amdminorders.component.css'
})
export class AmdminordersComponent {
  constructor(private apiService: ApiService) { }
  orders: any[] = [];
  filteredOrders: any[] = [];
  ordersSearchQuery: string = '';
  ngOnInit() {
    this.apiService.getAllOrders().subscribe((data) => {
      this.orders = data;
      this.filteredOrders = data;
      console.log(this.orders);
    })
  }
  filterOrder() {
    const query = this.ordersSearchQuery.toLowerCase().trim();
    this.filteredOrders = this.orders.filter(order =>
      order.id?.toString().includes(query) ||
      order.amount?.toString().includes(query) ||
      order.order_stat?.toLowerCase().includes(query) ||
      order.orderedBy?.fullName?.toLowerCase().includes(query)
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
