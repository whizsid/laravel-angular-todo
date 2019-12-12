import { Component, OnInit } from '@angular/core';
import User from '../../../core/models/user.model';
import UserService from '../../../core/services/user.service';

@Component({
  selector: 'app-layout-header-component',
  templateUrl: './app-layout-header.component.html'
})
export class AppLayoutHeaderComponent implements OnInit {

  public loggedUser: User|undefined = undefined;

  constructor(
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.loggedUser = this.userService.loggedUser;
  }

}
