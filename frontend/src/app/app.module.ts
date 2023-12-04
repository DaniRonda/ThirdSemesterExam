import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ChefScreenComponent} from "./ChefScreen/Chef-Screen.component";
import {UserScreenComponent} from "./UserScreen/User-Screen.component";
import {UserPayScreenComponent} from "./UserPayScreen/User-Pay-Screen.component";
import {AdminUserScreenComponent} from "./AdminUsersScreen/Admin-Users-Screen.component";
import {AdminScreenComponent} from "./AdminScreen/Admin-Screen.component";
import {AdminHistoryScreenComponent} from "./AdminHistoryScreen/Admin-History-Screen";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [AppComponent, ChefScreenComponent,
    UserScreenComponent, UserPayScreenComponent,
    AdminUserScreenComponent, AdminScreenComponent,
    AdminHistoryScreenComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FaIconComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
