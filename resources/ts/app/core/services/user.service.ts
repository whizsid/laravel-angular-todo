import APIService, { APIResponse } from './api.service';
import NotificationService from './notification.service';
import User, { IUser } from '../models/user.model';
import { SERVER_API_URL } from 'resources/ts/config';
import { Injectable } from '@angular/core';
import JWTService from './jwt.service';

interface ILoginSuccessResponse {
  message: string;
  user: IUser;
  token: string;
}

interface ISignupSuccessResponse {
  message: string;
}

interface ILogoutSuccessResponse {
  message: string;
}

interface IAuthenticateSuccessResponse {
  user: IUser;
  message: string;
}

@Injectable()
export default class UserService {

  public loggedUser: User;
  public checked = false;
  private token: string;

  constructor(
    private apiService: APIService,
    private notificationService: NotificationService,
    private jwtService: JWTService
  ) {
  }

  protected setAuth(fields: IUser, token: string): void {
    this.loggedUser = new User(fields);
    this.token = token;
    this.jwtService.saveToken(token);
  }

  protected clearAuth(): void {
    this.loggedUser = undefined;
    this.token = undefined;
    this.jwtService.destroyToken();
  }

  public async login(email: string, password: string): Promise<APIResponse<ILoginSuccessResponse>> {
    return this.apiService.post<ILoginSuccessResponse>('user/login', {
      email, password
    })
      .then(response => {
        if (response.success) {
          this.setAuth(response.user, response.token);

          this.notificationService.success(response.message);
        } else if (response.message) {
          this.notificationService.error(response.message);
        }

        return response;
      });
  }

  public async signup(name: string, email: string, password: string): Promise<APIResponse<ISignupSuccessResponse>> {
    return this.apiService.post<ISignupSuccessResponse>('user/signup', {
      email, password, name
    }).then(response => {
      if (response.success) {
        this.notificationService.success(response.message);
      } else if (response.message) {
        this.notificationService.error(response.message);
      }

      return response;
    });
  }

  public async logout(): Promise<APIResponse<ILogoutSuccessResponse>> {
    return this.apiService.post<ILogoutSuccessResponse>('user/logout')
      .then(response => {
        if (response.success) {
          this.notificationService.success(response.message);
          this.clearAuth();
        } else {
          this.notificationService.error(response.message);
        }

        return response;
      });
  }

  public async check(): Promise<APIResponse<IAuthenticateSuccessResponse>> {
    this.token = this.jwtService.getToken();
    this.checked = true;

    return this.apiService.post<IAuthenticateSuccessResponse>(`${SERVER_API_URL}user/check`, {
      token: this.token
    }).then(response => {
      if (response.success) {
        this.setAuth(response.user, this.token);
      } else {
        this.clearAuth();
      }

      return response;
    });
  }

}
