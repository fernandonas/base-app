import { provideKeycloak, withAutoRefreshToken, AutoRefreshTokenService, UserActivityService } from 'keycloak-angular';

export const provideKeycloakAngular = () =>
    provideKeycloak({
        config: {
            url: 'http://localhost:8080',
            realm: 'my-realm',
            clientId: 'angular-app'
        },
        initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
        },
        features: [
            withAutoRefreshToken({
                onInactivityTimeout: 'none',
                sessionTimeout: 0
            })
        ],
        providers: [AutoRefreshTokenService, UserActivityService]
    });