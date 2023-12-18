import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {ModalController} from "@ionic/angular";
import {ReceiptInfoComponent} from "../ReceiptInfo/reciept-info.component";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import {Order} from "../../models";
import {HttpClient} from "@angular/common/http";
import {State} from "../state";

interface DataItem {
  name: string;
  time: string;
}
@Component({
  template:
  `<!doctype html>

  <head>
    <meta name="viewport" content="with=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WackDonald's Orders</title>
    <link rel="icon" href="images/favicon.ico">
    <script src="https://kit.fontawesome.com/6cff64fb2c.js" crossorigin="anonymous"></script>


  </head>
  <body>
  <div class="header">
    <div class="inner_header">
      <div class="logocontainer">
        <img src="assets/mcdlogo.png" alt="">
      </div>
      <ul class="navigation">
        <a (click)="openUsers()">
          <li>Users</li>
        </a>
        <a (click)="openAdmin()">
          <li>Main Screen</li>
        </a>
        <a (click)="logout()">
          <li>Log out</li>
        </a>
      </ul>
    </div>
  </div>
  <h1 class="">Receipts Of Orders</h1>
  <input type="text" id="searchInput" placeholder="Search.." [(ngModel)]="searchQuery" (input)="searchItems()">
  <div id="container">
    <div class="hisContainer">
      <div class="recieptContainer">
        <ul id="hisList">
          <div *ngFor="let item of state.orders; let i = index" (click)="openModal(item.orderId)">
            <li>{{ item.orderItemArrayId }}</li>
            <p>{{ item.orderTime }} | {{item.orderDate}}</p>
          </div>
        </ul>
      </div>
    </div>
  </div>
  </body>
  `,
  styleUrls: ['Admin-History-Screen.scss'],
})
export class AdminHistoryScreenComponent  {
  searchQuery: string = "";
  order : Order | undefined;
  constructor(private changeDetectorRef: ChangeDetectorRef,
              public modalController: ModalController,
              private router: Router,
              public state: State,
              public http: HttpClient) {this.getFeedData();}
  data: DataItem[] = [  ];







  searchItems(): void {
    const list = document.getElementById("hisList");

    if (list) {
      // Get all list items inside the list
      const items = list.getElementsByTagName("div");
      let query = this.searchQuery.toLowerCase();
      // Convert the query to lowercase for case-insensitive search
      query = query.toLowerCase();
      console.log(query)

      // Loop through all items and hide or show them based on the search query
      for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;

        // Check if the item's text contains the search query
        const shouldShow = query === "" || text.toLowerCase().indexOf(query) > -1;

        // Show or hide the entire li element
        items[i].style.display = shouldShow ? "" : "none";

        // If there's a <p> element, show or hide it accordingly
        const pElement = items[i].querySelector("p");
        if (pElement) {
          pElement.style.display = shouldShow ? "" : "none";
        }
      }
    }
  }


  openUsers() {
    this.router.navigate(['AdminUserScreen']);
  }

  openAdmin() {
    this.router.navigate(['AdminScreen']);
  }

  logout() {
    this.router.navigate(['home']);
  }
  async openModal(orderId: number | undefined) {
    const modal = await this.modalController.create({
      component: ReceiptInfoComponent,
      componentProps: {
        orderId: orderId
      }
    });

    await modal.present();
  }

  protected readonly faXmark = faXmark;

  async getFeedData() {
    const call = this.http.get<Order[]>(environment.baseUrl + '/api/orders');
    this.state.orders = await firstValueFrom<Order[]>(call);
  }

  protected readonly Order = Order;
}
