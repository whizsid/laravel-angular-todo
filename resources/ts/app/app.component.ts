import { Component, OnInit } from '@angular/core';
import UserService from './core/services/user.service';
import User from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'ts';

  public user: User;

  constructor(
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.userService.check().then(response => {
      if (response.success) {
        this.user = this.userService.loggedUser;
      }
    });
  }

}
