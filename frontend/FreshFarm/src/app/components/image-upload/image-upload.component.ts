import { Component } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  imageUrl: string | null = null;
  isLoading: boolean = false;

  constructor(private cloudinaryService: CloudinaryService) { }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isLoading = true;
      try {
        this.imageUrl = await this.cloudinaryService.uploadImage(file);
        console.log(this.imageUrl);
      } catch (error) {
        console.error('Upload failed', error);
      }
      this.isLoading = false;
    }
  }
}
