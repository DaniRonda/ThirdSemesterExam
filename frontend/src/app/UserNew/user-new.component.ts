import {Component, OnInit} from "@angular/core";
import {faFloppyDisk, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

import {Order, ResponseDto, User} from "../../models";
import {State} from "../state";
import {ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
  styleUrls: ['user-new.scss'],
  template: `

    <div id="makenew">
      <button (click)="closeNewUser()" class="closeBtn">x</button>
      <h3 id="nameTitle">New User</h3>
      <div class="loginInfo">
        <h3 class="loginInfo" id="loginTitle">Login Information</h3>
        <input [formControl]="createNewUserForm.controls.username" type="text" placeholder="Username" id="newusernameInput">
        <input [formControl]="createNewUserForm.controls.password" type="text" placeholder="Password" id="newpasswordInput">
      </div>
      <select [formControl]="createNewUserForm.controls.role" id="userType" name="userType">
        <option value="user">user</option>
        <option value="chef">chef</option>
        <option value="admin">admin</option>
      </select>
      <div class="foot">
        <div class="buttons">
          <button [disabled]="createNewUserForm.invalid" (click)="addUser()" id="footNewButtonSave">+</button>
        </div>

      </div>
    </div>
   `,

})
export class UserNewComponent {

  createNewUserForm = this.fb.group({
    username: ['', Validators.minLength(1) ],
    password: ['', Validators.minLength(1)],
    role: ['', Validators.pattern('(?:user|chef|admin)')],
  })



  constructor( private activatedRoute: ActivatedRoute,  public state: State,
               public modalController: ModalController, public fb: FormBuilder,
               public http: HttpClient, public toastController: ToastController) {

  }
  closeNewUser() {
    const modal = this.modalController.dismiss({
      component: UserNewComponent
    });
    modal.catch()
  }


  async addUser() {
    console.log("add")
    try {
      const call = this.http.post<ResponseDto<User>>(environment.baseUrl + '/api/users', this.createNewUserForm.getRawValue())
      console.log(this.createNewUserForm.getRawValue())
      const response = await firstValueFrom(call);

      this.state.users.push(response.responseData!);


      const toast = await this.toastController.create({
        message: 'User was created!',
        duration: 1233,
        color: "success"
      })
      toast.present();
      this.modalController.dismiss();
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        const toast = await this.toastController.create({
          message: e.error.messageToClient,
          color: "danger"
        });
        toast.present();
      }
    }
  }

  protected readonly faXmark = faXmark;
  protected readonly faPlus = faPlus;
}
