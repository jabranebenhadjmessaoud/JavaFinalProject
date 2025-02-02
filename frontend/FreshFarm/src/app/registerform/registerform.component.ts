import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-registerform',
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  data: User = {}
  errMessage: any = {}
  constructor(private apiService: ApiService, private router: Router) { }

  register(): void {
    let verif: boolean = false
    this.apiService.register(this.data).subscribe({
      next: (res) => {
        console.log("register")
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userName', res.fullName);
        // console.log(res)
        verif = true
        console.log(verif, res.role)
        if (localStorage.getItem('role') == 'ROLE_FARMER') {
          this.router.navigate(['/homepage'])
        }
        if (localStorage.getItem('role') == 'ROLE_ADMIN') {
          this.router.navigate(['/admin'])
        }
        if (localStorage.getItem('role') == 'ROLE_CLIENT') {
          this.router.navigate(['/homepage'])
        }
      },
      error: err => this.errMessage = err
    })
  }

}
