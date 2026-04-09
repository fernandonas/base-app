import { inject } from '@angular/core';
import { provideAppInitializer } from '@angular/core';
import Keycloak from 'keycloak-js';
import { AuthService } from '../auth';

export const provideAuthInitializer = () =>
    provideAppInitializer(async () => {
        const kc = inject(Keycloak);
        const auth = inject(AuthService);
        kc.onAuthSuccess = async () => {
            await auth.syncUser();
        };
    });