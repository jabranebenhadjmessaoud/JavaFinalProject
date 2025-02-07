import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) { }
  user_stat = localStorage.getItem('user_stat');

  //show this alert if user_stat == BANNED
  ngOnInit(): void {
    if (this.user_stat == "BANNED") {
      Swal.fire({
        title: '🚫 You Are Banned!',
        text: 'You are restricted from posting. Please contact the admin for more details.',
        icon: 'error', // Use error for a red alert
        confirmButtonText: 'Contact Admin',
        confirmButtonColor: '#d33', // Red button
        backdrop: true, // Dark background for focus
        allowOutsideClick: false, // Prevent clicking outside to close
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'mailto:admin@freshka.com'; // Open email on button click
        }
      });

    }
  }

}
