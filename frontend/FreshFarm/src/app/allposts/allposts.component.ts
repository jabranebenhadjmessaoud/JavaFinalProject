import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';


@Component({
  selector: 'app-allposts',
  imports: [NavbarComponent, CommonModule, FormsModule],
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
  getTimeAgo(post: any): string {
    if (!post || !post.createdAt) return 'Unknown';

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
