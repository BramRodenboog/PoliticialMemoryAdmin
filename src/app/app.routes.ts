import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AdminPage } from './pages/admin-page/admin-page';
import { Login } from './pages/login/login';
import { GamesPage } from './pages/games-page/games-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'admin',
    component: AdminPage,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'games',
    component: GamesPage,
  }
];
