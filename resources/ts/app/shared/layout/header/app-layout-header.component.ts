import { Component, OnInit } from '@angular/core';
import User from '../../../core/models/user.model';
import UserService from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header-component',
  templateUrl: './app-layout-header.component.html',
  styleUrls: ['./app-layout-header.component.css']
})
export class AppLayoutHeaderComponent implements OnInit {

  public loggedUser: User|undefined = undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.getLoggedUser.subscribe(this.changeUser);
  }

  protected changeUser = (user: User) => {
    this.loggedUser = user;
  }

  public ngOnInit() {
    this.loggedUser = this.userService.loggedUser;
  }

  public handleLogout() {
    this.userService.logout().then(response => {
      window.setTimeout(() => this.router.navigate(['/']), 2000);
    });
  }

}
