import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl ="http://localhost:8080";

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/create-payment-intent`, {
      amount: amount,
      currency: 'usd'
    });
  }
}