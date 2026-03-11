import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./app/feature/home/home.routes').then(m => m.HOME_ROUTES)
    }
];
