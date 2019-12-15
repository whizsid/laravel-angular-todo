import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRUDComponent } from './crud/crud.component';
import AuthGuard from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: CRUDComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
