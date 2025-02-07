import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../comment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-showpostdetails',
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './showpostdetails.component.html',
  styleUrl: './showpostdetails.component.css'
})
export class ShowpostdetailsComponent {
  post: any = null;
  postId: string | null = null;
  comments: any = null;
  // comment: Comment = '';
  data: Comment = {};
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

    this.apiService.getOnePostComments(Number(postId)).subscribe
      ({
        next: (data) => {
          this.comments = data;
          console.log(data);
          console.log("************");
          console.log(this.comments);
        }
      })
  }

  loadComments() {
    this.apiService.getOnePostComments(Number(this.postId)).subscribe((data) => {
      this.comments = data;
    });
  }


  createComment(): void {
    if (!this.data.comment) return; // Prevent empty comments from being posted

    this.apiService.createComment(this.data, Number(this.postId)).subscribe({
      next: (data) => {
        this.data.comment = ''; // Clear the input field
        this.loadComments(); // Reload comments after successful post

        // Show a SweetAlert toast notification
        Swal.fire({
          toast: true,
          position: 'bottom-left',
          icon: 'success',
          title: 'Your comment has been sent!',
          showConfirmButton: false,
          timer: 2000 // Auto close after 2 seconds
        });
      },
      error: (err) => {
        console.error("Error posting comment:", err);
      }
    });
  }


  showComments = false; // Initially hide comments

  toggleComments() {
    this.showComments = !this.showComments; // Toggle visibility
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
