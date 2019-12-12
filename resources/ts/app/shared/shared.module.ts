import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './directives/show-authed.directive';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    RouterModule,
    ShowAuthedDirective
  ]
})
export class SharedModule {}
