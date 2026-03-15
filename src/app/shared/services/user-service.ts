import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IUserResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly API = environment.api.user;

  public getUser(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(this.API);
  }
}
