import { Component, OnInit } from '@angular/core';
import User from '../../../core/models/user.model';
import UserService from '../../../core/services/user.service';

@Component({
  selector: 'app-layout-footer-component',
  templateUrl: './app-layout-footer.component.html',
  styleUrls: ['./app-layout-footer.component.css']
})
export class AppLayoutFooterComponent implements OnInit {

  public loggedUser: User|undefined = undefined;

  constructor(
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.loggedUser = this.userService.loggedUser;
  }

}
