import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

@Component({
  selector: 'app-productdetails',
  imports: [NavbarComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {
  product: any = null;
  productId: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId)
    if (productId) {
      this.apiService.showProductDetails(Number(productId)).subscribe({
        next: (data) => {
          this.product = data;
          console.log(this.product, "product");
        }
      });
    }
    this.productId = this.route.snapshot.paramMap.get('id');

    // Check if the ID is valid (only numbers allowed)
    if (!this.productId || !/^\d+$/.test(this.productId)) {
      this.router.navigate(['/404']); // Redirect to 404 if invalid
    }
  }

  getTimeAgo(): string {
    if (!this.product || !this.product.createdAt) return 'Unknown';

    const now = new Date();
    const postDate = new Date(this.product.createdAt);
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
