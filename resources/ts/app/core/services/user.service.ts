import APIService, { APIResponse } from './api.service';
import NotificationService from './notification.service';
import User, { IUser } from '../models/user.model';
import { SERVER_API_URL } from 'resources/ts/config';
import { Injectable, Output, EventEmitter } from '@angular/core';
import JWTService from './jwt.service';
import * as moment from 'moment';

interface ILoginSuccessResponse {
  message: string;
  user: IUser;
  token: string;
}

interface ISignupSuccessResponse {
  message: string;
  user: IUser;
  token: string;
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
  @Output() getLoggedUser: EventEmitter<User|undefined> = new EventEmitter();

  constructor(
    private apiService: APIService,
    private notificationService: NotificationService,
    private jwtService: JWTService
  ) {
  }

  protected setAuth(fields: IUser, token: string): void {
    this.loggedUser = new User({...fields, createdDate: moment(fields.createdDate), updatedDate: moment(fields.updatedDate)});
    this.getLoggedUser.emit(this.loggedUser);
    this.token = token;
    this.jwtService.saveToken(token);
  }

  protected clearAuth(): void {
    this.loggedUser = undefined;
    this.getLoggedUser.emit(undefined);
    this.token = undefined;
    this.jwtService.destroyToken();
  }

  public async login(email: string, password: string): Promise<APIResponse<ILoginSuccessResponse>> {
    return this.apiService.post<ILoginSuccessResponse>(`${SERVER_API_URL}user/login`, {
      email, password
    })
      .then(response => {
        if (response.success) {
          this.setAuth(response.user, response.token);

          this.notificationService.success(response.message, 2000);
        } else if (response.message) {
          this.notificationService.error(response.message);
        }

        return response;
      });
  }

  public async signup(name: string, email: string, password: string): Promise<APIResponse<ISignupSuccessResponse>> {
    return this.apiService.post<ISignupSuccessResponse>(`${SERVER_API_URL}user/signup`, {
      email, password, name
    }).then(response => {
      if (response.success) {
        this.notificationService.success(response.message, 2000);
        this.setAuth(response.user, response.token);
      } else if (response.message) {
        this.notificationService.error(response.message);
      }

      return response;
    });
  }

  public async logout(): Promise<APIResponse<ILogoutSuccessResponse>> {
    return this.apiService.post<ILogoutSuccessResponse>(`${SERVER_API_URL}user/logout`)
      .then(response => {
        if (response.success) {
          this.notificationService.success(response.message, 2000);
        } else {
          this.notificationService.error(response.message);
        }

        this.clearAuth();
        return response;
      });
  }

  public async check(): Promise<APIResponse<IAuthenticateSuccessResponse>> {
    this.token = this.jwtService.getToken();
    this.checked = true;

    if (!this.token) {
      return new Promise(() => ({
        success: false,
        message: 'No user logged in'
      }));
    }

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

  public isAuthenticated(): boolean {
    if (this.checked) {
      return !!this.loggedUser;
    }

    return false;
  }

}
