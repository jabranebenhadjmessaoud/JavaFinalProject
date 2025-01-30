import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-allproducts',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent {
  products: any = [];
  constructor(private apiService: ApiService) { }

  // This method will be called when the component is initialized
  // It will fetch all products from the API
  ngOnInit() {
    this.apiService.getallproducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

}
