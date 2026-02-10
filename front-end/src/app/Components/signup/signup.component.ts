import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Model/user';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  errorType: 'error' | 'success' | 'info' = 'info';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getters for easy access in HTML
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get age() { return this.signupForm.get('age'); }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const userData: User = {
        name: this.name?.value,
        email: this.email?.value,
        password: this.password?.value
      };
      this.authService.signup(userData).subscribe({
        next: (response) => {
          console.log('User signed up successfully:', response);
          this.isLoading = false;
          this.errorMessage = '✅ Account created successfully!';
          this.errorType = 'success';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error signing up user:', error);
          this.isLoading = false;

          if (error.status === 409) {
            this.errorMessage = '❌ This email is already registered';
            this.errorType = 'error';
          } else if (error.status === 400) {
            this.errorMessage = 'ℹ️ The entered data is invalid';
            this.errorType = 'error';
          } else if (error.status === 0) {
            this.errorMessage = '⚠️ Could not connect to server. Check your internet connection';
            this.errorType = 'error';
          } else {
            this.errorMessage = '❌ An unexpected error occurred';
            this.errorType = 'error';
          }
        }
      });
    }
  }
}
