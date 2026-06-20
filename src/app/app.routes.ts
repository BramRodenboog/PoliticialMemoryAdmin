import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AdminPage } from './pages/admin-page/admin-page';
import { Login } from './pages/login/login';
import { GamesPage } from './pages/games-page/games-page';
import { UserPage } from './pages/user-page/user-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'games',
    component: GamesPage,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UserPage,
    canActivate: [authGuard],
  },
];
