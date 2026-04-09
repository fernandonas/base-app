import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../shared/services/user-service';
import { IUserResponse } from '../../../shared/models';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly route = inject(Router);


  public async syncUser() {
    await firstValueFrom(this.httpClient.get<IUserResponse>(environment.api.signIn).pipe(
      tap((user) => {
        this.userService.setUser(user);
        if (user.first_access) {
          this.route.navigate(['/first-login']);
        }

      })
    ));
  }

  private userRoles(): string[] {
    const kc = inject(Keycloak);
    const token = kc.tokenParsed;
    if (!token) return [];
    return token.realm_access?.roles || [];
  }

  public allowedRole(roles: string[]): boolean {
    const userRoles = this.userRoles();
    return roles.some(role => userRoles.includes(role));
  }

}
