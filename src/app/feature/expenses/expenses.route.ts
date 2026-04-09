import { Routes } from '@angular/router';

export const EXPENSES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/expenses/expenses').then(m => m.Expenses) 
    }
];