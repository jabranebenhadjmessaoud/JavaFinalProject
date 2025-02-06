import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  role: string | null = null

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    //this.role=localStorage.getItem("role")
  }

  title = 'FreshFarm';



}
