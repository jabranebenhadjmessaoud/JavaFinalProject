import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Report } from '../report';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  imports: [NavbarComponent, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

  product: any = null;
  reports: any = null;
  productId: string | null = null;
  data: Report = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
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




  createReport(): void {
    console.log(this.data.reportContent);
    this.apiService.createReport(this.data, Number(this.productId)).subscribe
      ({
        next: (data) => {
          this.router.navigate(['/']);
          Swal.fire({
            title: 'Report Sent Successfully!',
            text: 'Your report has been sent and will be reviewed shortly.',
            icon: 'info', // Using 'info' icon to indicate it’s an informational message
            showConfirmButton: false,
            timer: 3000, // Auto close in 3 seconds
            toast: true,
            position: 'top-end', // Appears at the top right
            customClass: {
              popup: 'report-toast' // Custom class for styling
            }
          });

        }
      })
  }
}
