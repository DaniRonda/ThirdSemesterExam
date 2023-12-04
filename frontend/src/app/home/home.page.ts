import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isPopupVisible: boolean = false;
  username: string = '';
  password: string = '';
  constructor() {}

  myFunction() {
    alert("Contact your manager or a technician via +4511223344")
  }

  login() {
    console.log("never gonna give you up")
  }
}
