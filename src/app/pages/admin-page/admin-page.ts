import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { HighchartsChartComponent } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, HighchartsChartComponent, Card],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {
  populairApis = signal<any>([]);

  userCount = signal<number>(0);
  gameCount = signal<number>(0);

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Loading...',
    },
    series: [
      {
        type: 'pie',
        data: [],
      },
    ],
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAggregate().subscribe((data) => {
      this.gameCount.set(data[0].aantal_spellen);
      this.userCount.set(data[1].aantal_spelers);

      this.populairApis.set(data[2].sort((a: any, b: any) => b.aantal - a.aantal));

      this.chartOptions = {
        ...this.chartOptions,
        title: {
          text: "Verdeling van API's",
        },
        series: [
          {
            type: 'pie',
            name: 'API',
            showInLegend: false,
            data: this.populairApis().map((api: any) => ({
              name: api.api,
              y: api.aantal,
            })),
          },
        ],
      };
    });
  }
}
