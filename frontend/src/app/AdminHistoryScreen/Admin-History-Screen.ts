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
  templateUrl: 'Admin-History-Screen.component.html',
  styleUrls: ['Admin-History-Screen.scss'],
})
export class AdminHistoryScreenComponent  {
  searchQuery: string = "";
  constructor(private changeDetectorRef: ChangeDetectorRef,
              public modalController: ModalController,
              private router: Router,
              public state: State,
              public http: HttpClient) {this.getFeedData();}
  data: DataItem[] = [
    { name: "WackChicken Menu: ChickenBox Menu: BigWack Menu: Price:", time: "17:54 19/11/2023" },
    { name: "WackCheese Double Patty Menu: WackChicken Menu: ChickenBox Menu: BigWack Menu: Price:", time: "19:21 20/11/2023" },
    { name: "ChickenBox Menu: WackChicken Menu: BigWack Menu: Price:", time: "18:47 19/11/2023" },
    // Add more data objects as needed
  ];







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
  async openModal() {
    const modal = await this.modalController.create({
      component: ReceiptInfoComponent
    });
    modal.present();
  }
  protected readonly faXmark = faXmark;

  async getFeedData() {
    const call = this.http.get<Order[]>(environment.baseUrl + '/api/orders');
    this.state.orders = await firstValueFrom<Order[]>(call);
  }

}
