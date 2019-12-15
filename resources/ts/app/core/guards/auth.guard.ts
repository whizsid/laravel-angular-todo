import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import UserService from '../services/user.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private userSerivce: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const authenticated =  this.userSerivce.isAuthenticated();

    if (!authenticated) {
      this.router.navigate(['/user/login']);
    }

    this.userSerivce.getLoggedUser.subscribe(response => {
      if (!response) {
        this.router.navigate(['/user/login']);
      }
    });

    return authenticated;
  }
}
