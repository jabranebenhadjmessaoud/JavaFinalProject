import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  //ban farmer
  banFarmer(user: any) {
    if (confirm(`Are you sure you want to ban ${user.fullName}?`)) {
      this.apiService.banFarmer(user.id).subscribe(() => {
        user.banned = true;
        Swal.fire({
          title: '🚫 User Banned!',
          text: 'The user has been banned successfully.',
          icon: 'error', // Red error icon
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33', // Red button
          backdrop: true,
          timer: 3000, // Auto close after 3 seconds
        });
        this.loadUsers();
      });
    }
  }
  //unban farmer
  unbanFarmer(user: any) {
    if (confirm(`Are you sure you want to unban ${user.fullName}?`)) {
      this.apiService.unbanFarmer(user.id).subscribe(() => {
        user.banned = true;
        Swal.fire({
          title: '✅ User Unbanned!',
          text: 'The user has been unbanned successfully.',
          icon: 'success', // Green success icon
          confirmButtonText: 'OK',
          confirmButtonColor: '#28a745', // Green button
          backdrop: true,
          timer: 3000, // Auto close after 3 seconds
        });
        this.loadUsers();
      });
    }
  }
  loadUsers() {
    this.apiService.getallusers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

}
