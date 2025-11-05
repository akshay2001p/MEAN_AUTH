import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="center-page">
      <div class="card">
        <div class="brand-hero">
          <div>
            <h1>Create an account</h1>
            <div class="muted">Join us — it only takes a minute</div>
          </div>
        </div>

        <form (ngSubmit)="onSubmit()" #regForm="ngForm">
          <input [(ngModel)]="userData.username" name="username" placeholder="Username" required minlength="3">
          <input [(ngModel)]="userData.email" name="email" type="email" placeholder="Email" required email>
          <input [(ngModel)]="userData.password" name="password" type="password" placeholder="Password" required minlength="6">

          <button class="vibrant-btn" type="submit" [disabled]="!regForm.valid">Register</button>
          <div *ngIf="error" class="error">{{ error }}</div>
        </form>

        <p style="text-align:center; margin-top:12px;">Already have an account? <a routerLink="/login">Login</a></p>
      </div>
    </div>
  `,
  styles: [``]
})
export class RegisterComponent {
  userData = { username: '', email: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.userData).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => this.error = err.error.msg || 'Registration failed'
    });
  }
}