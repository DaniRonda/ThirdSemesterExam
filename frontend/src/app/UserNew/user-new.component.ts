import {Component, OnInit} from "@angular/core";
import {faFloppyDisk, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

import {Order} from "../../models";
import {State} from "../state";
import {ModalController} from "@ionic/angular";

@Component({
  styleUrls: ['user-new.scss'],
  template: `

    <div id="makenew">
      <button (click)="closeNewUser()" class="closeBtn">x</button>
      <h3 id="nameTitle">User/Employee Name</h3>
      <input type="text" placeholder="Name" id="newnameInput">
      <div class="loginInfo">
        <h3 class="loginInfo" id="loginTitle">Login Information</h3>
        <input type="text" placeholder="Username" id="newusernameInput">
        <input type="text" placeholder="Password" id="newpasswordInput">
      </div>
      <h3 class="loginInfo" id="loginId">ID</h3>
      <input type="text" placeholder="Id" id="newIdInput">
      <div class="foot">
        <div class="buttons">
          <button (click)="addUser()" id="footNewButtonSave">+</button>
        </div>
        <details class="custom-select">
          <summary class="radios">
            <input type="radio" name="item" id="default" title="Choose Role" checked>
            <input type="radio" name="item" id="item1" title="User">
            <input type="radio" name="item" id="item2" title="Chef">
            <input type="radio" name="item" id="item3" title="Admin">

          </summary>
          <ul class="list">
            <li>
              <label for="item1">
                User
                <span></span>
              </label>
            </li>
            <li>
              <label for="item2">Chef</label>
            </li>
            <li>
              <label for="item3">Admin</label>
            </li>
          </ul>
        </details>
      </div>
    </div>
   `,

})
export class UserNewComponent {





  constructor( private activatedRoute: ActivatedRoute,  public state: State, public modalController: ModalController) {

  }
  closeNewUser() {
    const modal = this.modalController.dismiss({
      component: UserNewComponent
    });
    modal.catch()
  }


  addUser() {
  console.log("create")
  }

  protected readonly faXmark = faXmark;
  protected readonly faPlus = faPlus;
}
