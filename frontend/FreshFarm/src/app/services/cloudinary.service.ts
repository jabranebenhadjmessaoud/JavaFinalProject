import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private cloudName = 'dpc3ku9lh'; // Replace with your Cloudinary cloud name
  private uploadPreset = 'freshkav1'; // Set in Cloudinary Settings

  constructor() { }

  async uploadImage(file: File): Promise<string | null> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset); // Required for unsigned uploads

    try {
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data.secure_url; // The uploaded image URL
    } catch (error) {
      console.error('Upload failed', error);
      return null;
    }
  }
}
