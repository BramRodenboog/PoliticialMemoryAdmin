import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly tokenKey = 'token';

  private authState = signal(this.isAuthenticated());
  readonly isAuthenticatedSignal = this.authState.asReadonly();

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>('http://localhost:8000/memory/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.authState.set(true);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp <= currentTime) {
        this.logout();
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles && payload.roles.includes('ROLE_ADMIN');
    } catch (e) {
      return false;
    }
  }
}
