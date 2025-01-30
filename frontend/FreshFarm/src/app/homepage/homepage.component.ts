import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) { }


}
