import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../api.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-loginform',
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {

  data: User = {}
  errMessage: any = {}
  constructor(private apiService: ApiService, private router: Router) { }

  authenticate(): void {
    let verif: boolean = false
    this.apiService.authenticate(this.data).subscribe({
      next: (res) => {
        console.log("logIn")
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userName', res.fullName);
        // console.log(res)
        verif = true
        console.log(verif)
        if (localStorage.getItem('role') == 'ROLE_FARMER') {
          this.router.navigate(['/homepage'])
        }
        if (localStorage.getItem('role') == 'ROLE_ADMIN') {
          this.router.navigate(['/homepage'])
        }
        if (localStorage.getItem('role') == 'ROLE_CLIENT') {
          this.router.navigate(['/homepage'])
        }
      },
      error: err => this.errMessage = err
    })
  }

}
