import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import UserService from '../services/user.service';

@Injectable()
export default class GuestGuard implements CanActivate {
  constructor(
    private userSerivce: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const authenticated =  this.userSerivce.isAuthenticated();

    if (authenticated) {
      this.router.navigate(['/']);
    }

    return !authenticated;
  }
}
