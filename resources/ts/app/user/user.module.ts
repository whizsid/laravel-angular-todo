import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }
