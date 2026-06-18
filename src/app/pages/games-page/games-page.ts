import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [HighchartsChartComponent],
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
      text: 'Loading...'
    },
    xAxis: {
      categories: []
    },
    series: [{
      type: 'column',
      data: []
    }]
  };
  games = signal<any[]>([]);

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
    this.http.get<any>('http://localhost:8000/admin/games', this.headers()).subscribe((data) => {
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
          }
        ]
      }
    });
  }

  getChartData() {
    const today = new Date();

    const days = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      return {
        key: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' }),
        count: 0
      };
    }).reverse();

    this.games().forEach((game) => {
      const gameDate = new Date(game.date.date.substring(0, 10)).toISOString().split('T')[0];

      const day = days.find((d) => d.key === gameDate);
      if (day) {
        day.count++;
      }
    });

    return days;
  }
};
