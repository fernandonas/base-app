import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./feature/home/home.routes').then(m => m.HOME_ROUTES)
    }
];
