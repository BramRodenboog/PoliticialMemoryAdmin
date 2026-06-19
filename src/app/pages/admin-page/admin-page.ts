import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/AdminService';

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

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getPlayers().subscribe((data) => {
      this.users.set(data);
      this.userCount.set(data.length);
    });
    this.adminService.getAggregate().subscribe((data) => {
      this.gameCount.set(data[0].aantal_spellen);
      this.userCount.set(data[1].aantal_spelers);
      console.log(data);
      this.populairApis.set([
        ...this.populairApis(),
        ...data[2].sort((a: any, b: any) => b.aantal - a.aantal),
      ]);
    });
    this.adminService.getGames().subscribe((data) => {
      this.games.set([...this.games(), ...data]);
    });
  }
}
