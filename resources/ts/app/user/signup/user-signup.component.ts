import { Component } from '@angular/core';
import UserService from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['../user-auth.component.css']
})
export class UserSignupComponent {

  public name: string;
  public email: string;
  public password: string;
  public submited = 'Submit';
  public message: string|undefined ;
  public status: 'success'|'error'|undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
      this.userService.signup(this.name, this.email, this.password).then(response => {
        if (response.success) {
          this.status = 'success';
          this.message = response.message;

          window.setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        } else {
          this.status = 'error';
          this.message = response.message ? response.message : 'Network error occured during the action.';
        }
      });
  }
}
