import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-farmerform',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, NavbarComponent],
  templateUrl: './farmerform.component.html',
  styleUrl: './farmerform.component.css'
})
export class FarmerformComponent {

}
