import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="center-page">
      <div class="card">
        <div class="brand-hero">
          <div>
            <h1>Welcome back</h1>
            <div class="muted">Login to continue to your account</div>
          </div>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <input 
            [(ngModel)]="credentials.email" 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            email>
          <input 
            [(ngModel)]="credentials.password" 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            minlength="6">

          <button class="vibrant-btn" type="submit" [disabled]="!loginForm.valid">Login</button>
          <div *ngIf="error" class="error">{{ error }}</div>
        </form>

        <p style="text-align:center; margin-top:12px;">Don't have an account? <a routerLink="/register">Register</a></p>
      </div>
    </div>
  `,
  styles: [``]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => this.error = err.error.msg || 'Login failed'
    });
  }
}