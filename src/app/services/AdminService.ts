import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/admin';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
  }

  getPlayers() {
    return this.http.get<any[]>(`${this.baseUrl}/players`, this.headers());
  }

  getGames() {
    return this.http.get<any[]>(`${this.baseUrl}/games`, this.headers());
  }

  getAggregate() {
    return this.http.get<any>(`${this.baseUrl}/aggregate`, this.headers());
  }

  getDates() {
    return this.http.get<any>(`${this.baseUrl}/dates`, this.headers());
  }
}
