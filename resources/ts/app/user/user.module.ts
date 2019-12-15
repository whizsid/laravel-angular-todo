import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './login/user-login.component';
import { UserSignupComponent } from './signup/user-signup.component';

@NgModule({
  declarations: [
    UserLoginComponent, UserSignupComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }
