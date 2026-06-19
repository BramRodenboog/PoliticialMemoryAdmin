import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { Button } from '../../components/button/button';
import { AdminService } from '../../services/AdminService';

@Component({
  selector: 'app-user-page',
  imports: [Card, Button],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {
  users = signal<any>([]);

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getPlayers().subscribe((data) => {
      this.users.set(data);
    });
  }
}
