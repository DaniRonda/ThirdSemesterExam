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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReceiptInfoComponent} from "./ReceiptInfo/reciept-info.component";
import {UserEditComponent} from "./UserEdit/user-edit.component";
import {HttpClientModule} from "@angular/common/http";
import {UserNewComponent} from "./UserNew/user-new.component";


@NgModule({
  declarations: [AppComponent, ChefScreenComponent,
    UserScreenComponent, UserPayScreenComponent,
    AdminUserScreenComponent, AdminScreenComponent,
    AdminHistoryScreenComponent, ReceiptInfoComponent,
  UserEditComponent, UserNewComponent],
    imports: [BrowserModule, IonicModule.forRoot(),
        AppRoutingModule, FaIconComponent,
        BrowserAnimationsModule, MatFormFieldModule,
        MatInputModule, MatDatepickerModule,
        MatNativeDateModule, FormsModule,
        HttpClientModule, ReactiveFormsModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
