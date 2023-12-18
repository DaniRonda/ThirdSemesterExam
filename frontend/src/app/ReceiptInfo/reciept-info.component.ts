import {Component, OnInit} from "@angular/core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

import {Order} from "../../models";
import {State} from "../state";
import {ModalController, NavParams} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";

@Component({
  styleUrls: ['receipt-info.scss'],
  template: `

    <div id="getFull" *ngIf="order">
      <button (click)="closeReciept()"><fa-icon [icon]="faXmark"></fa-icon></button>
      <h1>Receipt ID: {{order.orderId}}</h1>
      <h3>Contents</h3>
      <div class="contentPane">
        <ul class="contents">
            <li>
              {{order.orderItemArrayId}}
            </li>
        </ul>
      </div>
      <p class="time">{{ order.orderTime }} | {{order.orderDate}}</p>
    </div>
   `,

})
export class ReceiptInfoComponent implements OnInit{

  protected readonly faXmark = faXmark;
  order: Order | undefined;
  constructor( private activatedRoute: ActivatedRoute,  public state: State,
               public modalController: ModalController, private navParams: NavParams,
               private http: HttpClient) {
    //this.setId();
  }
  closeReciept() {
    const modal = this.modalController.dismiss({
      component: ReceiptInfoComponent
    });
  modal.catch()
  }
  ngOnInit() {
    const orderId = this.navParams.get('orderId');
    this.loadOrderInfo(orderId);
  }
  private async loadOrderInfo(orderId: number | undefined) {
      if (orderId) {
        const call = this.http.get<Order>(environment.baseUrl + '/api/orders/' + orderId);
        this.order = await firstValueFrom<Order>(call);
        console.log(this.order)
      } else {

      }

  }

}
