import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {TokenService} from "../../services/token.service";
import {ResponseDto} from "../../models";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isPopupVisible: boolean = false;
  username: string = '';
  password: string = '';
  loginForm: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private toast: ToastController,
  private token: TokenService, private router: Router) {

    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  myFunction() {
    alert("Contact your manager or a technician via +4511223344")
  }

  /*login() {
    const usernameValue = this.loginForm.get('username').value;
    const passwordValue = this.loginForm.get('password').value;

    // Use the values as needed
    console.log('Username:', usernameValue);
    console.log('Password:', passwordValue);
  }*/

  async login() {
    /*console.log('Username:', this.loginForm.value);

    const url = "http://localhost:5000/api/users/login";
    var response = await firstValueFrom(this.http.post<ResponseDto<{ token: string }>>(url, this.loginForm.value));
    this.tokenService.setToken(response.responseData!.token);



    (await this.toast.create({
      message: response.messageToClient,
      color: "success",
      duration: 5000
    })).present();*/
    try {
      const {token} = await firstValueFrom(this.http.post<any>(environment.baseUrl+"/api/users/login",this.loginForm.value));
      this.token.setToken(token);
    } catch (unauthorized) {
      await (await this.toast.create({
        message: "Wrong username or password",
        duration: 5000
      })).present();

    }

    if (this.token.getToken() == null || this.token.getToken() == "undefined" || this.token.getToken() == "") {

    } else {
      this.router.navigate(['/UserScreen'], {replaceUrl:true});

      await (await this.toast.create({
        message: "Welcome",
        duration: 5000
      })).present();
    }
  }

}


