import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';


@Component({
  selector: 'app-showpostdetails',
  imports: [NavbarComponent],
  templateUrl: './showpostdetails.component.html',
  styleUrl: './showpostdetails.component.css'
})
export class ShowpostdetailsComponent {
  post: any = null;
  postId: string | null = null;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }


  //fetch post details
  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.apiService.showpostdetails(Number(postId)).subscribe({
        next: (data) => {
          this.post = data;
          console.log(this.post, "posssssst");
        }
      });
    }
    this.postId = this.route.snapshot.paramMap.get('id');

    // Check if the ID is valid (only numbers allowed)
    if (!this.postId || !/^\d+$/.test(this.postId)) {
      this.router.navigate(['/404']); // Redirect to 404 if invalid
    }
  }

  getTimeAgo(): string {
    if (!this.post || !this.post.createdAt) return 'Unknown';

    const now = new Date();
    const postDate = new Date(this.post.createdAt);
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
