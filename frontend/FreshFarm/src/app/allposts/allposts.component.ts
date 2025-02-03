import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-allposts',
  imports: [NavbarComponent,CommonModule, FormsModule],
  templateUrl: './allposts.component.html',
  styleUrl: './allposts.component.css'
})
export class AllpostsComponent {
  posts: any[] = [];

  constructor(private apiService: ApiService) { }


  ngOnInit() {

    this.apiService.getallposts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

}
