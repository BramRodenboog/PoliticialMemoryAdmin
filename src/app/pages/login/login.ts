import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  onLogin() {
    this.error = '';

    this.http
      .post<{ token: string }>('http://localhost:8000/memory/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.error = 'Foute gebruikersnaam of wachtwoord';
        },
      });
  }
}
