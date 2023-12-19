import {Component, ElementRef, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {Order} from "../../models";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {State} from "../state";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastController} from "@ionic/angular";

@Component({
  templateUrl: 'Chef-Screen.component.html',
  styleUrls: ['Chef-Screen.component.scss'],
})
export class ChefScreenComponent {
  orders: any[] = [];
  private _orderNumber: any;
  hours: string = '';
  minutes: string = '';
  seconds: string = '';
  order : Order | undefined;
  constructor(private el: ElementRef, private renderer: Renderer2,
              private router: Router, public http: HttpClient,
              public state: State, public fb: FormBuilder,
              public toastController: ToastController) {this.getFeedData();}

  logout() {
    this.router.navigate(['home']);
  }



  async updateOrder(orderId: number | undefined): Promise<void> {
    // Your logic to remove the order goes here
    this.updateOrderForm.patchValue({orderIsDone: true});

    try {
      this.state.currentOrder = (await firstValueFrom(this.http.get<any>(environment.baseUrl + '/api/orders/' + orderId)));
      console.log("lol" + this.state.currentOrder.orderId)
    } catch (e) {
      console.log(e);
      console.log(this.state.currentOrder.orderId);
    }
    await this.submit();
  }
  updateOrderForm = this.fb.group({
    orderIsDone: [this.state.currentOrder.orderIsDone, [Validators.required]],
    orderDate: [this.state.currentOrder.orderDate, [Validators.required]],
    orderTime: [this.state.currentOrder.orderTime, [Validators.required]],
    orderItemArrayId: [this.state.currentOrder.orderItemArrayId, [Validators.required]],
  });
  async submit() {
    console.log("lol2 " + this.state.currentOrder.orderId)
    try {
      const existingData = {
       orderDate: this.state.currentOrder.orderDate,
        orderTime: this.state.currentOrder.orderTime,
        orderItemArrayId: this.state.currentOrder.orderItemArrayId
      };
      this.updateOrderForm.patchValue({ orderIsDone: true });

      const updatedData = { ...this.updateOrderForm.value, ...existingData };
      console.log("here" + existingData)
      const call = this.http.put<Order>(environment.baseUrl + '/api/orders/' + this.state.currentOrder.orderId, updatedData);
      const result = await firstValueFrom<Order>(call);
      let index = this.state.orders.findIndex(b => b.orderId == this.state.currentOrder.orderId)
      this.state.orders[index] = result;
      this.state.currentOrder = result;
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
  ngOnInit() {
    setInterval(() => {
      const currentTime = new Date();
      const hrs = this.el.nativeElement.querySelector('#hrs');
      const min = this.el.nativeElement.querySelector('#min');
      const sec = this.el.nativeElement.querySelector('#sec');

      if (hrs && min && sec) {
        this.renderer.setProperty(hrs, 'innerHTML', currentTime.getHours());
        this.renderer.setProperty(min, 'innerHTML', currentTime.getMinutes());
        this.renderer.setProperty(sec, 'innerHTML', currentTime.getSeconds());
      }

    }, 1000);
  }

  async getFeedData() {
    const call = this.http.get<Order[]>(environment.baseUrl + '/api/orders');
    this.state.orders = await firstValueFrom<Order[]>(call);
  }

}
