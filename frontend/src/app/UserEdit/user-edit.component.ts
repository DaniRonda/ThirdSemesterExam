import {Component, OnInit} from "@angular/core";
import {faFloppyDisk, faTrashCan, faXmark} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

import {Order} from "../../models";
import {State} from "../state";
import {ModalController} from "@ionic/angular";

@Component({
  styleUrls: ['user-edit.scss'],
  template: `

    <div id="getFull">
      <button (click)="closeUser()" class="closeBtn"><fa-icon [icon]="faXmark"></fa-icon></button>
      <h1 class="userName">Username {{"name"//user.name}}</h1>
      <div class="loginInfo">
        <h3>Login Information</h3>
        <input type="text" value="Username"  id="usernameInput" autocomplete="off" placeholder="User name">
        <input type="text" value="Password"  id="passwordInput" autocomplete="off" placeholder="Pass word">
      </div>
      <h3>ID</h3>
      <p id="idText">test {{"1"//user.id}}</p>
      <div class="contentPane">
        <ul class="contents">

        </ul>
      </div>
      <div class="foot">
        <div class="buttons">
          <button (click)="saveUser()" id="footButtonSave"><fa-icon [icon]="faFloppyDisk"></fa-icon></button>
          <button (click)="deleteUser()" id="footButtonDelete"><fa-icon [icon]="faTrashCan"></fa-icon></button>
        </div>
        <p class="role">Employee {{"chef"//user.type}}</p>
      </div>

    </div>
   `,

})
export class UserEditComponent {



  protected readonly faXmark = faXmark;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faFloppyDisk = faFloppyDisk;
  constructor( private activatedRoute: ActivatedRoute,  public state: State, public modalController: ModalController) {

  }
  closeUser() {
    const modal = this.modalController.dismiss({
      component: UserEditComponent
    });
    modal.catch()
  }

  saveUser() {
  console.log("save")
  }

  deleteUser() {
  console.log("delete")
  }
}
