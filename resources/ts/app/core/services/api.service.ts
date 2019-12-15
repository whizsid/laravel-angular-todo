import axios from 'axios';
import {stringify} from 'query-string';
import { Injectable } from '@angular/core';
import JWTService from './jwt.service';

export interface IAPISuccessResponse {
  success: true;
}

export interface IAPIErrorResponse {
  success: false;
  message?: string;
  // Use this object when you need to describe your error field to field
  details?: {
    [x: string]: string;
  };
}

export type APIResponse<T> = IAPIErrorResponse | (IAPISuccessResponse&T);

@Injectable()
export default class APIService {
  constructor(
    private jwtService: JWTService
  ) {}

  private getAuthHeaders(): {[x: string]: any} {
    const token = this.jwtService.getToken();

    return token ? {Authorization: `Bearer ${token}`} : {};
  }

  public get<T>(url: string, queries: {[x: string]: any} = {}): Promise<APIResponse<T>> {
    return axios.get<APIResponse<T>>(`${url}?${stringify(queries)}`, {
      headers: {
        Accept: 'application/json',
        ...this.getAuthHeaders()
      }
    })
      .then(response => {
        return response.data as IAPISuccessResponse & T;
      }).catch((err) => {
        console.error(err);
        return {
          success: false,
          message: 'Server error occured during your operation'
        } as IAPIErrorResponse;
      });
  }

  public async post<T>(url: string, queries: {[x: string]: any} = {}): Promise<APIResponse<T>> {
    return axios.post<APIResponse<T>>(url, queries, {
      headers: {
        Accept: 'application/json',
        ...this.getAuthHeaders()
      }
    })
    .then(response => {
      return response.data as IAPISuccessResponse & T;
    }).catch((err) => {
      console.error(err);
      return {
        success: false,
        message: 'Server error occured during your operation'
      } as IAPIErrorResponse;
    });
  }
}
