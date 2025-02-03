import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile: User = {};
  user_id : any| null=null
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.apiService.getuserbyid(this.user_id).subscribe((data) => {
      this.profile = data;
      console.log(this.profile);
    });
  }

}
