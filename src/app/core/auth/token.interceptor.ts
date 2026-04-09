import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import keycloak from 'keycloak-js';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const kc = inject(keycloak);
    const token = kc.token;

    if (!token) return next(req);

    return next(
        req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    );
};