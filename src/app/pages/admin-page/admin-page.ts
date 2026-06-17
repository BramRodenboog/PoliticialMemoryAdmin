import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {
  users: any[] = [];
  games: any[] = [];
  populairApis: any[] = [];

  userCount = 0;
  gameCount = 0;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
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
        this.users = data;
        this.userCount = data.length;
        this.cd.detectChanges();
      });
    this.http
      .get<any>('http://localhost:8000/admin/aggregate', this.headers())
      .subscribe((data) => {
        this.gameCount = data[0].aantal_spellen;
        this.userCount = data[1].aantal_spelers;
        console.log(data);
        this.populairApis = data[2].sort((a: any, b: any) => b.aantal - a.aantal);
        this.cd.detectChanges();
      });
    this.http.get<any[]>('http://localhost:8000/admin/games', this.headers()).subscribe((data) => {
      this.games = data;
      this.cd.detectChanges();
    });
  }
}
