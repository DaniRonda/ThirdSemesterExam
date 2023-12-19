import {ChangeDetectorRef, Component} from '@angular/core';
import {faFloppyDisk, faTrashCan, faXmark} from "@fortawesome/free-solid-svg-icons";
import {ReceiptInfoComponent} from "../ReceiptInfo/reciept-info.component";
import {ModalController} from "@ionic/angular";
import {UserEditComponent} from "../UserEdit/user-edit.component";
import {UserNewComponent} from "../UserNew/user-new.component";
import {Router} from "@angular/router";
import {Order, User} from "../../models";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {State} from "../state";
import {HttpClient} from "@angular/common/http";


@Component({
  templateUrl: 'Admin-Users-Screen.component.html',
  styleUrls: ['Admin-Users-Screen.component.scss'],
})


export class AdminUserScreenComponent {
  searchQuery: string = "";

  constructor(private changeDetectorRef: ChangeDetectorRef,
              public modalController: ModalController,
              private router: Router,
              public state: State,
              public http: HttpClient) {this.getFeedData();}



  openHistory() {
    this.router.navigate(['AdminHistoryScreen']);
  }

  openAdmin() {
    this.router.navigate(['AdminScreen']);
  }

  logout() {
    this.router.navigate(['home']);
  }

  openUsers() {

  }

  openEmployees() {

  }

  async openNew() {
    const modal = await this.modalController.create({
      component: UserNewComponent
    });
    modal.present();
  }


  async openEditModal(userId: string | undefined) {
    const modal = await this.modalController.create({
      component: UserEditComponent,
      componentProps: {
        userId: userId
      }
    });
    this.state.currentUser = (await firstValueFrom(this.http.get<any>(environment.baseUrl + "/api/user/id/" + userId)));
    await modal.present();
  }

  protected readonly faXmark = faXmark;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faTrashCan = faTrashCan;

  searchItems() {
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
  async getFeedData() {
    const call = this.http.get<User[]>(environment.baseUrl + '/api/users');
    this.state.users = await firstValueFrom<User[]>(call);
  }
}
