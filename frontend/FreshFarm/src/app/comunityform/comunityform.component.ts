import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Post } from '../post';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comunityform',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, NavbarComponent],
  templateUrl: './comunityform.component.html',
  styleUrl: './comunityform.component.css'
})
export class ComunityformComponent {
  
    data: Post = {};
    errMessage: any = {};
    userName: string | null = '';


  constructor(private apiService: ApiService, private router: Router) { }
  
    ngOnInit(): void {
      // Retrieve the username when the component initializes
      this.userName = localStorage.getItem('userName');
    }

    createPost():void{
      this.apiService.createpost(this.data).subscribe({
        next: (res) => {
          this.router.navigate(['/homepage']);
        },
        error: err => this.errMessage = err
      })
    }



}
