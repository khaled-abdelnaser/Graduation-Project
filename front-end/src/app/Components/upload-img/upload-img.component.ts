import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for @if and other features

@Component({
  selector: 'app-upload-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.css'
})
export class UploadImgComponent {
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      console.log('Sending to AI API...', this.selectedFile);
      // Here you would call your service to send the file to the backend
      alert('File sent for analysis!');
    }
  }
}