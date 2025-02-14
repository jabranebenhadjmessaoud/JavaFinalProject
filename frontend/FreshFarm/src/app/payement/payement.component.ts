import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent {
  cardNumber: string = '';
  expiry: string = '';
  cvc: string = '';
  name: string = '';
  email: string = '';
  paymentSuccess: boolean = false;
  submitted: boolean = false;
  invalidCardType: boolean = false; // New error flag for invalid card type

  constructor(private router: Router) { }

  onSubmit() {
    this.submitted = true;
    this.invalidCardType = false; // Reset invalid card type flag

    // Validate card type
    const cardNumberCleaned = this.cardNumber.replace(/\s/g, ''); // Remove spaces
    if (!this.isValidCardType(cardNumberCleaned)) {
      this.invalidCardType = true; // Set error flag if card type is invalid
    }

    // Validate all fields
    if (this.cardNumber.length === 16 && this.expiry && this.cvc.length === 3 && this.name && this.email && !this.invalidCardType) {
      this.paymentSuccess = true;
      this.cardNumber = '';
      this.expiry = '';
      this.cvc = '';
      this.name = '';
      this.email = '';
      this.submitted = false;
      this.router.navigate(['/']);
      Swal.fire({
        title: 'Payment Successful!',
        text: 'Your payment has been processed and your order has been placed successfully.',
        icon: 'success',
        showConfirmButton: false, // Do not show the confirm button
        timer: 2000, // Auto close in 2 seconds
        backdrop: true, // Optional: adds a backdrop
        allowOutsideClick: false, // Prevent closing by clicking outside
      });
    }
  }

  // Function to validate card type
  private isValidCardType(cardNumber: string): boolean {
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/; // Visa: 13 or 16 digits
    const masterCardPattern = /^5[1-5][0-9]{14}$/; // MasterCard: 16 digits

    return visaPattern.test(cardNumber) || masterCardPattern.test(cardNumber);
  }
}