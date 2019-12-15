import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { AppLayoutHeaderComponent } from './shared/layout/header/app-layout-header.component';
import { AppLayoutFooterComponent } from './shared/layout/footer/app-layout-footer.component';
import { SharedModule } from './shared/shared.module';
import { CRUDComponent } from './crud/crud.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './shared/layout/notifications/notification.component';

@NgModule({
  declarations: [
    AppComponent, AppLayoutHeaderComponent, AppLayoutFooterComponent, CRUDComponent, NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
