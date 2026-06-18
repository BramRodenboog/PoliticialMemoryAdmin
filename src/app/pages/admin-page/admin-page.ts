import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {
  users = signal<any>([]);
  games = signal<any>([]);
  populairApis = signal<any>([]);

  userCount = signal<number>(0);
  gameCount = signal<number>(0);

  constructor(
    private http: HttpClient,
  ) { }

  headers() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
  }

  ngOnInit() {
    this.http
      .get<any[]>('http://localhost:8000/admin/players', this.headers())
      .subscribe((data) => {
        this.users.set(data);
        this.userCount.set(data.length);
      });
    this.http
      .get<any>('http://localhost:8000/admin/aggregate', this.headers())
      .subscribe((data) => {
        this.gameCount.set(data[0].aantal_spellen);
        this.userCount.set(data[1].aantal_spelers);
        console.log(data);
        this.populairApis.set([...this.populairApis(), ...data[2].sort((a: any, b: any) => b.aantal - a.aantal)]);
      });
    this.http.get<any[]>('http://localhost:8000/admin/games', this.headers()).subscribe((data) => {
      this.games.set([...this.games(), ...data]);
    });
  }
}
