import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-payment',
  template: `
    <div class="payment-form">
      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>
      <form (submit)="handleSubmit($event)" #paymentForm="ngForm">
        <div class="form-row">
          <div id="card-element"></div>
          <div id="card-errors" role="alert"></div>
        </div>
        <button [disabled]="loading" class="btn btn-primary mt-3">
          {{ loading ? 'Processing...' : 'Pay $9.99' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .payment-form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
    }
    #card-element {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class PaymentComponent implements OnInit {
  private stripePublicKey="pk_test_51QNW5hH7JyKzDcbartTtRzJe3WctaHLBwBEHfO1v3souBDeXpqhGZfdTUhT7Vf57Rjw83HQaNbWgxWM3berZKmmf00FPSu20Oz"
  private stripe: any;
  private elements: any;
  private card: any;
  loading = false;
  error: string = '';

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    this.stripe = await loadStripe(this.stripePublicKey);
    this.elements = this.stripe.elements();
    
    this.card = this.elements.create('card');
    this.card.mount('#card-element');

    this.card.addEventListener('change', ({error}: any) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError!.textContent = error.message;
      } else {
        displayError!.textContent = '';
      }
    });
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.error = '';

    try {
      const {paymentMethod, error} = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Amount in cents (999 = $9.99)
      const response = await this.paymentService.createPaymentIntent(999).toPromise();
      
      const result = await this.stripe.confirmCardPayment(response.clientSecret, {
        payment_method: paymentMethod.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Payment successful
      console.log('Payment successful:', result.paymentIntent);
      alert('Payment successful!');
      
    } catch (error: any) {
      this.error = error.message;
      const errorElement = document.getElementById('card-errors');
      errorElement!.textContent = error.message;
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    if (this.card) {
      this.card.destroy();
    }
  }
}