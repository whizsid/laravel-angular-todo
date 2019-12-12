import { Injectable } from '@angular/core';
import APIService, { APIResponse } from './api.service';
import NotificationService from './notification.service';
import { AppendId, Base } from '../models/base.model';
import { SERVER_API_URL } from 'resources/ts/config';


interface IUpdateSuccessResponse<T> {
  message: string;
  data: T;
}

interface IDeleteSuccessResponse {
  message: string;
}

interface ICreateSuccessResponse<T> {
  message: string;
  data: T;
}

interface ISearchSuccessResponse<T> {
  results: T[];
  count: number;
}

type ICURDModel = (new (fields: { [x: string]: any}) => unknown )& {link: string; };

@Injectable()
export default class CRUDService {

  constructor(
    private apiService: APIService,
    private notificationService: NotificationService
  ) {}

  public search<T>(type: ICURDModel, fields: Partial<T>): Promise<APIResponse<ISearchSuccessResponse<T>>> {
    const link = type.link;

    return this.apiService.post<ISearchSuccessResponse<T>>(`${SERVER_API_URL}crud/${link}/search`, {
      fields
    });
  }

  public async save<T>(type: ICURDModel, model: Base<T>): Promise<APIResponse<IUpdateSuccessResponse<AppendId<T>>>> {
    return this.apiService.post<IUpdateSuccessResponse<AppendId<T>>>(`${SERVER_API_URL}crud/${type.link}/update`, {
      data: model.data
    }).then(response => {
      if (response.success) {

        this.notificationService.success(response.message);
        model.data = response.data;
        model.original = true;

      } else if (response.message) {
        this.notificationService.error(response.message);
      }

      return response;
    });
  }

  public async delete<T>(type: ICURDModel, model: Base<T>): Promise<APIResponse<IDeleteSuccessResponse>> {
    return this.apiService.post<IDeleteSuccessResponse>(`${SERVER_API_URL}crud/${type.link}/delete`, {
      id: model.data.id
    }).then(response => {
      if (response.success) {

        this.notificationService.success(response.message);
        model.deleted = true;

      } else if (response.message) {
        this.notificationService.error(response.message);
      }

      return response;
    });
  }

  public async create<T>(type: ICURDModel, model: Base<T>): Promise<APIResponse<ICreateSuccessResponse<AppendId<T>>>> {
    return this.apiService.post<ICreateSuccessResponse<AppendId<T>>>(`${SERVER_API_URL}crud/${type.link}/create`, {
      data: model.data
    }).then(response => {
      if (response.success) {

        this.notificationService.success(response.message);
        model.data = response.data;
        model.original = true;

      } else if (response.message) {
        this.notificationService.error(response.message);
      }

      return response;
    });
  }

}
