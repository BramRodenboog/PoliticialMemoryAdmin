import { Component, OnInit, signal } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { AdminService } from '../../services/admin.service';
import { Button } from '../../components/button/button';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [HighchartsChartComponent, Button, Card],
  templateUrl: './games-page.html',
  styleUrl: './games-page.css',
})
export class GamesPage implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Loading...',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Aantal spellen',
      },
    },
    series: [
      {
        type: 'column',
        data: [],
        showInLegend: false,
      },
    ],
  };
  games = signal<any[]>([]);
  dates = signal<Record<string, number>>({});

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getDates().subscribe((data) => {
      this.dates.set(data);
    });

    this.adminService.getGames().subscribe((data) => {
      this.games.set(data);

      const chartData = this.getChartData();

      this.chartOptions = {
        ...this.chartOptions,
        title: {
          text: 'Spellen per dag',
        },
        xAxis: {
          categories: chartData.map((day) => day.label),
        },
        series: [
          {
            type: 'column',
            name: 'Spellen',
            showInLegend: false,
            data: chartData.map((day) => day.count),
          },
        ],
      };
    });
  }

  getChartData() {
    const today = new Date();

    const days = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const key = date.toISOString().split('T')[0];

      return {
        key,
        label: date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' }),
        count: this.dates()?.[key] || 0,
      };
    }).reverse();

    return days;
  }
}
