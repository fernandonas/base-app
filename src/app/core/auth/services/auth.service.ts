import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ILoginRequest, ILoginResponse } from '../models/login.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IRegisterRequest, IRegisterResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly httpClient = inject(HttpClient);
  private readonly notificationService = inject(NzNotificationService);

  private readonly API = environment.api.login;

  public login(loginRequest: ILoginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.API}`, loginRequest)
      .pipe(
        tap(loginResponse => this.onSuccesLogin(loginResponse)),
        catchError(error => {
          this.onErrorLogin();
          throw error;
        }));
  }

  public register(registerRequest: IRegisterRequest): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(`${this.API}:register`, registerRequest)
      .pipe(
        tap(() => {
          this.notificationService.success('Cadastro realizado com sucesso!!', '');
          this.login(registerRequest as ILoginRequest).subscribe();
        }),
        catchError(error => {
          this.notificationService.error('Erro ao realizar cadastro', '');
          throw error;
        }
        ));
  }

  private onSuccesLogin(loginResponse: ILoginResponse): void {
    localStorage.setItem('token', loginResponse.token);
    this.notificationService.success('Bem-vindo!!', 'Redirecionado para a página inicial.');
    this.router.navigate(['/']);
  }

  private onErrorLogin(): void {
    this.notificationService.error('Usuário ou senha inválidos!', '');
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