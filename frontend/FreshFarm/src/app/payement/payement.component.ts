import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

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

  onSubmit() {
    this.submitted = true;
    if (this.cardNumber.length === 16 && this.expiry && this.cvc.length === 3 && this.name && this.email) {
      this.paymentSuccess = true;
      this.cardNumber = '';
      this.expiry = '';
      this.cvc = '';
      this.name = '';
      this.email = '';
      this.submitted = false;
    }
  }
}
