import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import GuestGuard from '../core/guards/guest.guard';
import { UserLoginComponent } from './login/user-login.component';
import { UserSignupComponent } from './signup/user-signup.component';


const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'signup',
    component: UserSignupComponent,
    canActivate: [GuestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
