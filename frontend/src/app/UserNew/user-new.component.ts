import {Component, OnInit} from "@angular/core";
import {faFloppyDisk, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

import {Order, ResponseDto, User} from "../../models";
import {State} from "../state";
import {ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
enum Role {
  Admin = 0,
  Chef = 1,
  User = 2,
}
@Component({
  styleUrls: ['user-new.scss'],
  template: `

    <div id="makenew">
      <button (click)="closeNewUser()" class="closeBtn">x</button>
      <h3 id="nameTitle">New User</h3>
      <div class="loginInfo">
        <h3 class="loginInfo" id="loginTitle">Login Information</h3>
        <input [formControl]="createNewUserForm.controls.Username" type="text" placeholder="Username" id="newusernameInput">
        <input [formControl]="createNewUserForm.controls.Password" type="text" placeholder="Password" id="newpasswordInput">
      </div>
      <select [formControl]="createNewUserForm.controls.role" id="userType" name="userType">
        <option value="2">user</option>
        <option value="1">chef</option>
        <option value="0">admin</option>
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
    Username: ['', Validators.minLength(1) ],
    Password: ['', Validators.minLength(1)],
    role: [Role.User, Validators.pattern('^(0|1|2)$')],
  })
  Username = new FormControl('', Validators.required);
  Role = new FormControl('', Validators.required);
  Password = new FormControl('', Validators.required);

  formGroup = new FormGroup({
    Username: this.Username,
    Role: this.Role,
    Password: this.Password,
  });


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
    console.log("add");
    try {
      const call = this.http.post<ResponseDto<User>>(environment.baseUrl + "/api/users/register", this.createNewUserForm.getRawValue());
      console.log(this.createNewUserForm.getRawValue());
      const response = await firstValueFrom(call);
      console.log(response);
      this.state.users.push(response.responseData!);

      console.log("hey listen");

      const toast = await this.toastController.create({
        message: 'User was created!',
        duration: 1233,
        color: "success"
      });
      toast.present();
      this.modalController.dismiss();
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.error && e.error.messageToClient) {
        const toast = await this.toastController.create({
          message: e.error.messageToClient,
          color: "danger"
        });
        toast.present();
      } else {
        console.error("An unexpected error occurred:", e);
        // Handle other types of errors or log them as needed.
      }
    }
  }

  protected readonly faXmark = faXmark;
  protected readonly faPlus = faPlus;
}
