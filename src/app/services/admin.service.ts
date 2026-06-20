import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class AdminService {
  private baseUrl = 'http://localhost:8000/admin';
  private http = inject(HttpClient);

  getPlayers() {
    return this.http.get<any[]>(`${this.baseUrl}/players`);
  }

  getGames() {
    return this.http.get<any[]>(`${this.baseUrl}/games`);
  }

  getAggregate() {
    return this.http.get<any>(`${this.baseUrl}/aggregate`);
  }

  getDates() {
    return this.http.get<any>(`${this.baseUrl}/dates`);
  }
}
