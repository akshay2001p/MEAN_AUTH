import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';  // Backend base
  private tokenKey = 'auth-token';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    // Only attempt to fetch current user in a browser environment where
    // localStorage and other browser globals exist. This avoids errors
    // during server-side rendering where `localStorage` is undefined.
    if (token && typeof window !== 'undefined') {
      // Auto-load user on init (optional: fetch from /profile)
      this.fetchCurrentUser();
    }
  }

  register(userData: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(tap(response => this.setAuthData(response)));
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(tap(response => this.setAuthData(response)));
  }

  getProfile(): Observable<User> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers })
      .pipe(tap(user => this.userSubject.next(user)));
  }

  private fetchCurrentUser(): void {
    if (this.isLoggedIn()) {
      this.getProfile().subscribe({
        error: () => this.logout()  // Invalid token? Log out
      });
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    this.userSubject.next(response.user);
  }

  private getToken(): string | null {
    try {
      if (typeof window === 'undefined' || !('localStorage' in window)) {
        return null;
      }
      return localStorage.getItem(this.tokenKey);
    } catch {
      // Defensive: if access to localStorage throws (privacy mode, SSR),
      // just return null.
      return null;
    }
  }
}