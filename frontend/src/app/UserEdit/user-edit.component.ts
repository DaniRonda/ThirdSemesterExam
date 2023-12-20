import {Component, OnInit} from "@angular/core";
import {faFloppyDisk, faTrashCan, faXmark} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

import {User} from "../../models";
import {State} from "../state";
import {ModalController, NavParams, ToastController} from "@ionic/angular";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  styleUrls: ['user-edit.scss'],
  template: `

    <div id="getFull" *ngIf="user">
      <button (click)="closeUser()" class="closeBtn"><fa-icon [icon]="faXmark"></fa-icon></button>
      <h1 class="userName">Username {{user.username}}</h1>
      <div class="loginInfo">
        <h3>Login Information</h3>
        <input [formControl]="editUserForm.controls.username" type="text"  id="usernameInput" autocomplete="off" placeholder="{{user.username}}">
        <input [formControl]="editUserForm.controls.passwordHash" type="text" value="Password"  id="passwordInput" autocomplete="off" placeholder="Pass word">
      </div>
      <h3>ID</h3>
      <p id="idText">{{user.userId}}</p>
      <div class="contentPane">
        <ul class="contents">

        </ul>
      </div>
      <div class="foot">
        <div class="buttons">
          <button (click)="saveUser(user.userId)" id="footButtonSave"><fa-icon [icon]="faFloppyDisk"></fa-icon></button>
          <button (click)="deleteUser(user.userId)" id="footButtonDelete"><fa-icon [icon]="faTrashCan"></fa-icon></button>
        </div>
        <p class="role">{{user.role}}</p>
      </div>

    </div>
   `,

})
export class UserEditComponent implements OnInit{

  user: User | undefined;

  editUserForm = this.fb.group({
    username: [this.state.currentUser.username, [Validators.required]],
    passwordHash: [this.state.currentUser.password, [Validators.required]],
    role: [this.state.currentUser.role, [Validators.required]],


  })

  protected readonly faXmark = faXmark;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faFloppyDisk = faFloppyDisk;
  constructor( private activatedRoute: ActivatedRoute,  public state: State,
               public modalController: ModalController, private navParams: NavParams,
               private http: HttpClient, public fb: FormBuilder,
               public toastController: ToastController) {

  }
  async saveUser(userId: string | undefined) {

    console.log("current2" + this.state.currentUser.userId)
    try {
      const existingData = {
        password: this.state.currentUser.password,
        role: this.state.currentUser.role,

      };
      console.log("currentsalt" + this.state.currentUser.password)
      const updatedData = { ...this.editUserForm.value, ...existingData };
      console.log("here" + existingData)
      const call = this.http.put<User>(environment.baseUrl + '/api/user/id/' + this.state.currentUser.userId, updatedData);
      const result = await firstValueFrom<User>(call);
      let index = this.state.users.findIndex(b => b.userId == this.state.currentUser.userId)
      this.state.users[index] = result;
      this.state.currentUser = result;
      const toast = await this.toastController.create({
        message: 'successfully updated',
        duration: 1000,
        color: 'success'
      })
      toast.present();

    } catch (error: any) {
      console.log(error);
      let errorMessage = 'Error';

      if (error instanceof HttpErrorResponse) {
        // The backend returned an unsuccessful response code.
        errorMessage = error.error?.message || 'Server error';
      } else if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred.
        errorMessage = error.error.message;
      }

      const toast = await this.toastController.create({
        color: 'danger',
        duration: 2000,
        message: errorMessage
      });

      toast.present();
    }

  }
  async setId(userId: any) {
    try{
      this.state.currentUser = (await firstValueFrom(this.http.get<any>(environment.baseUrl + '/api/users/' + userId)));
      console.log("current" + this.state.currentUser)
    } catch (e) {
      console.log(e);
      console.log(this.state.currentUser.userId);
    }
  }
  closeUser() {
    const modal = this.modalController.dismiss({
      component: UserEditComponent
    });
    modal.catch()
  }



  async deleteUser(userId: string | undefined) {
    const call = this.http.delete(environment.baseUrl + '/api/user/id/' + userId);
    const result = await firstValueFrom(call);

    this.state.users = this.state.users.filter(a => a.userId != userId)
    console.log(call)
  }
  ngOnInit() {
    const userId = this.navParams.get('userId');

    this.loadUserInfo(userId);
    console.log("cur" + this.user)
  }
  private async loadUserInfo(userId: number | undefined) {
    if (userId) {
      const call = this.http.get<User>(environment.baseUrl + '/api/user/id/' + userId);
      this.user = await firstValueFrom<User>(call);
      console.log(this.user)
    } else {

    }

  }

}
