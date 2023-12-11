import {Component, OnInit} from "@angular/core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

import {Order} from "../../models";
import {State} from "../state";
import {ModalController} from "@ionic/angular";

@Component({
  styleUrls: ['receipt-info.scss'],
  template: `

    <div id="getFull">
      <button (click)="closeReciept()"><fa-icon [icon]="faXmark"></fa-icon></button>
      <h1>Receipt ID: {{"hi"//order.id}}</h1>
      <h3>Contents</h3>
      <div class="contentPane">
        <ul class="contents">
            <li>
              {{"item"//items in order}}
            </li>
        </ul>
      </div>
      <p class="time">{{"time"//time created}}</p>
    </div>
   `,

})
export class ReceiptInfoComponent {

  protected readonly faXmark = faXmark;
  order: Order | undefined;
  constructor( private activatedRoute: ActivatedRoute,  public state: State, public modalController: ModalController) {
    //this.setId();
  }
  closeReciept() {
    const modal = this.modalController.dismiss({
      component: ReceiptInfoComponent
    });
  modal.catch()
  }/*
  ngOnInit() {
    this.loadOrderInfo();
  }

  private async loadOrderInfo() {
    this.activatedRoute.params.subscribe(async (params) => {
      const orderId = params['orderId'];
      if (orderId) {
        const call = this.http.get<Order>(environment.baseUrl + '/api/orders/' + orderId);
        this.order = await firstValueFrom<Order>(call);
        console.log(this.order)
      } else {

      }
    });
  }
  async setId() {
    try{
      const id = (await firstValueFrom(this.activatedRoute.paramMap)).get('boxId');
      this.state.currentBox = (await firstValueFrom(this.httpClient.get<any>(environment.baseUrl + '/api/orders/' + id)));
    } catch (e) {
      console.log(e);
      console.log(this.state.currentBox.id);
    }
  }*/
}
