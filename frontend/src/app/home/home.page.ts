import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

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
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  myFunction() {
    alert("Contact your manager or a technician via +4511223344")
  }

  login() {
    const usernameValue = this.loginForm.get('username').value;
    const passwordValue = this.loginForm.get('password').value;

    // Use the values as needed
    console.log('Username:', usernameValue);
    console.log('Password:', passwordValue);
  }

}
