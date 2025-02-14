import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { OrderDetail } from '../order-detail';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatDividerModule, NavbarComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  orderDetails: OrderDetail[] = [];
  loading = true;
  error = '';
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal'];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      if (orderId) {
        this.loadOrder(orderId);
      }
    });
  }

  loadOrder(orderId: number): void {
    this.loading = true;
    this.orderService.getOrderById(orderId).subscribe({
      next: (data) => {
        this.orderDetails = data;
        console.log(this.orderDetails);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order details';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  calculateSubtotal(price: number, quantity: number): number {
    return price * quantity;
  }

  getTotalCost(): number {
    return this.orderDetails.reduce((total, item) =>
      total + (item.price * item.quantity), 0);
  }
}