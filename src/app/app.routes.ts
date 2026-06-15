import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AdminPage } from './pages/admin-page/admin-page';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'admin',
        component: AdminPage,
    }
];
