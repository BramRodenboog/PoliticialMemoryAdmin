import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [],
  templateUrl: './games-page.html',
  styleUrl: './games-page.css',
})
export class GamesPage implements OnInit {
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
    this.http.get<any>('http://localhost:8000/admin/aggregate', this.headers()).subscribe((data) => {
      this.gameCount.set(data[0].aantal_spellen);
    });
  }
}
