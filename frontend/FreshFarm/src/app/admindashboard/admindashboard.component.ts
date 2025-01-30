import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  users: any = [];
  products: any = [];
  constructor(private apiService: ApiService) { }


  // This method will be called when the component is initialized
  // It will fetch all users from the API
  ngOnInit() {
    this.apiService.getallusers().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
    this.apiService.getallproducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
}
