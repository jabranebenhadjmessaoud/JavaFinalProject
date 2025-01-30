import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-farmerform',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, NavbarComponent],
  templateUrl: './farmerform.component.html',
  styleUrl: './farmerform.component.css'
})
export class FarmerformComponent {
data:Product={}
errMessage: any = {}
  constructor(private apiService: ApiService, private router: Router) { }
  
  createProduct():void{
    this.apiService.createproduct(this.data).subscribe({
      next: (res) => {
        this.router.navigate(['/homepage'])

    },
    error: err => this.errMessage = err
  })
}

}
