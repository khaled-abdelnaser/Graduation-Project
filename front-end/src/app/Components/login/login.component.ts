import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { UserService } from '../../Services/user.service';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  errorType: 'error' | 'success' | 'info' = 'info';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      // Changed 'username' to 'email' and added email validator
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Getters updated to match new control names
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.userService.login(this.email?.value, this.password?.value).subscribe({
        next: (res) => {
          console.log('Login success', res);

          // Store user in localStorage
          localStorage.setItem('user', JSON.stringify(res));
          this.authService.user = res;

          this.isLoading = false;
          // Navigate to main page
          this.router.navigate(['/MainPage']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login error:', err);

          if (err.status === 401) {
            this.errorMessage = '❌ Invalid password';
            this.errorType = 'error';
          } else if (err.status === 404) {
            this.errorMessage = '❌ Email not registered';
            this.errorType = 'error';
          } else if (err.status === 0) {
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