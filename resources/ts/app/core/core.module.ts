import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import APIService from './services/api.service';
import CRUDService from './services/crud.service';
import JWTService from './services/jwt.service';
import NotificationService from './services/notification.service';
import UserService from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    APIService,
    CRUDService,
    JWTService,
    NotificationService,
    UserService
  ],
  declarations: []
})
export class CoreModule { }
