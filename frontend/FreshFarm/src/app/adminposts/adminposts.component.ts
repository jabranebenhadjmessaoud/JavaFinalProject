import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

@Component({
  selector: 'app-adminposts',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './adminposts.component.html',
  styleUrl: './adminposts.component.css'
})
export class AdminpostsComponent {
  posts: any[] = [];
  filteredPosts: any[] = [];
  postSearchQuery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getallposts().subscribe((data) => {
      this.posts = data;
      this.filteredPosts = data; // Initially display all products
    });
  }

  filterPosts() {
    const query = this.postSearchQuery.toLowerCase().trim();
    this.filteredPosts = this.posts.filter(post =>
      post.id.toString().includes(query) ||
      post.post_title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
      //add author to post
      // ||
      // post.author.toLowerCase().includes(query)
    );
  }

  getTimeAgo(post: any): string {
    const now = new Date();
    const postDate = new Date(post.createdAt);
    const minutesAgo = differenceInMinutes(now, postDate);
    const hoursAgo = differenceInHours(now, postDate);
    const daysAgo = differenceInDays(now, postDate);

    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo < 24) {
      const remainingMinutes = minutesAgo % 60;
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ${remainingMinutes > 0 ? remainingMinutes + ' minute' + (remainingMinutes > 1 ? 's' : '') : ''} ago`;
    } else {
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
  }
}
