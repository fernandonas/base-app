import { Injectable, Signal, signal } from '@angular/core';
import { IUserResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly user = signal<IUserResponse | null>(null);
  public setUser = (userResponse: IUserResponse) => this.user.set(userResponse);
  public udateUser = (userResponse: IUserResponse) => this.user.update(() => userResponse);
  public getUser = (): Signal<IUserResponse | null> => this.user.asReadonly();
}
