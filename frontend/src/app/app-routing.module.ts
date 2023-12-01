import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ChefScreenComponent} from "./ChefScreen/Chef-Screen.component";
import {UserScreenComponent} from "./UserScreen/User-Screen.component";
import {UserPayScreenComponent} from "./UserPayScreen/User-Pay-Screen.component";
import {AdminUserScreenComponent} from "./AdminUsersScreen/Admin-Users-Screen.component";
import {AdminScreenComponent} from "./AdminScreen/Admin-Screen.component";
import {AdminHistoryScreenComponent} from "./AdminHistoryScreen/Admin-History-Screen";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ChefScreen',
    component: ChefScreenComponent
  },
  {
    path: 'UserScreen',
    component: UserScreenComponent
  },
  {
    path: 'UserPayScreen',
    component: UserPayScreenComponent
  },
  {
    path: 'AdminUserScreen',
    component: AdminUserScreenComponent
  },
  {
    path: 'AdminScreen',
    component: AdminScreenComponent
  },
  {
    path: 'AdminHistoryScreen',
    component: AdminHistoryScreenComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
