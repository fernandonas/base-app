import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ILoginRequest, ILoginResponse } from '../models/login.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly notificationService = inject(NzNotificationService);
  
  private API = environment.api.login;

  public login(loginRequest: ILoginRequest) {
    return this.http.post<ILoginResponse>(`${this.API}`, loginRequest)
      .pipe(
        tap(loginResponse =>  this.onSuccesLogin(loginResponse)),
        catchError(error => {
          this.onErrorLogin();
          throw error;
        }));
  }

  private onSuccesLogin(loginResponse: ILoginResponse): void {
    localStorage.setItem('token', loginResponse.token);
    this.notificationService.success('Bem-vindo!!', 'Redirecionado para a página inicial.');
    this.router.navigate(['/']);
  }

  private onErrorLogin(): void {
    this.notificationService.error('Erro ao realizar login', '');
  }

  public onInvalidToken(): void {
    this.router.navigate(['/login']);
    this.notificationService.error('Ops!!', 'Faça login para acessar esta página.');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.notificationService.error('Você foi desconectado com sucesso.', 'Faça login novamente para acessar a aplicação.');
    this.router.navigate(['/login']);
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }
}