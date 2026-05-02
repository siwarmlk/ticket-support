import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export type SupportUser = {
  id: string;
  username: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = 'http://localhost:5000/api';
  private readonly tokenKey = 'support_token';
  private readonly userKey = 'support_user';

  readonly currentUser = signal<SupportUser | null>(this.readUserFromStorage());

  login(username: string, password: string) {
    return this.http
      .post<{ token: string; user: SupportUser }>(`${this.apiBase}/auth/login`, {
        username,
        password
      })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem(this.userKey, JSON.stringify(res.user));
          this.currentUser.set(res.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private readUserFromStorage(): SupportUser | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as SupportUser;
    } catch {
      return null;
    }
  }
}
