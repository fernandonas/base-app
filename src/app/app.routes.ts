import { Routes } from '@angular/router';
import { authGuard } from './core/auth';

export const APP_ROUTES: Routes = [
    {
        path: 'first-login',
        loadComponent: () => import('./feature/layouts/first-login/pages/first-login/first-login').then(m => m.FirstLogin)
    },
    {
        path: '',
        loadComponent: () => import('./feature/layouts/main-layout/pages/main-template/main-template').then(m => m.MainTemplate),
        children: [
            {
                path: '',
                canActivate: [authGuard],
                loadChildren: () => import('./feature/home/home.routes').then(m => m.HOME_ROUTES)
            },
            {
                path: 'expenses',
                canActivate: [authGuard],
                loadChildren: () => import('./feature/expenses/expenses.route').then(m => m.EXPENSES_ROUTES)
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
        ]
    }
    
];
