import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminusers',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css'
})
export class AdminusersComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  userSearchQuery: string = '';


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getallusers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Initially display all users
    });
  }

  filterUsers() {
    const query = this.userSearchQuery.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.id.toString().includes(query) ||
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  }
}
