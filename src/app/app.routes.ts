import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const APP_ROUTES: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./feature/home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'login',
        loadChildren: () => import('./feature/login/login.routes').then(m => m.LOGIN_ROUTES)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
