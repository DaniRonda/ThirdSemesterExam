import {ChangeDetectorRef, Component} from '@angular/core';
import {faFloppyDisk, faTrashCan, faXmark} from "@fortawesome/free-solid-svg-icons";
import {ReceiptInfoComponent} from "../ReceiptInfo/reciept-info.component";
import {ModalController} from "@ionic/angular";
import {UserEditComponent} from "../UserEdit/user-edit.component";
import {UserNewComponent} from "../UserNew/user-new.component";
import {Router} from "@angular/router";
interface DataItem {
  name: string;
  role: string;
  username: string;
  password: string;
  id: string;
}

@Component({
  templateUrl: 'Admin-Users-Screen.component.html',
  styleUrls: ['Admin-Users-Screen.component.scss'],
})


export class AdminUserScreenComponent {
  searchQuery: string = "";

  constructor(private changeDetectorRef: ChangeDetectorRef,
              public modalController: ModalController,
              private router: Router,) {}
  dataUser: DataItem[] = [
    { "name": "User User", "role": "UserScreen", "username": "user", "password": "user", "id": "12020"},
    { "name": "Ronald WackDonalds", "role": "UserScreen", "username": "RW", "password": "RWD", "id": "12021"},
    { "name": "Benjamin Heehee", "role": "UserScreen", "username": "BH", "password": "BHH", "id": "12022"},
    { "name": "Dani Hoohoo", "role": "UserScreen", "username": "DH", "password": "DHH", "id": "12023"},
    { "name": "Chef Chef ", "role": "Chef", "username": "chef", "password": "chef", "id": "12030"},
    { "name": "Rordon Gamsay ", "role": "Chef", "username": "RG", "password": "RGS", "id": "12031"},
    // Add more data objects as needed
  ];

  handleItemClick(clickedElement: EventTarget | null, index: number): void {
    const getFullElement = document.getElementById("getFull");

    if (getFullElement) {
      getFullElement.style.transform = "translateY(0%)";
      getFullElement.style.opacity = "1";
      getFullElement.style.transition = "transform 1s, height 1.5s, opacity 0.7s";

      // This function will be called when an li element is clicked
      // You can use the index and clickedElement to perform actions
      const selectedItem = this.dataUser[index];

      // Example: Display the data in the console
      console.log("Selected Item:", selectedItem);

      // Access the ul.contents element
      const getFullName = getFullElement.querySelector(".userName");
      if (getFullName) {
        getFullName.innerHTML = selectedItem.name;
      }
      const getFullId = getFullElement.querySelector("#idText");
      if (getFullId) {
        getFullId.innerHTML = selectedItem.id;
      }
      // Access the p.time element and set its content to the date
      let timeElement = getFullElement.querySelector(".time") as HTMLInputElement;
      timeElement.innerText = selectedItem.role;

      const usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
      const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;

      // Set the values for username and password
      if (usernameInput && passwordInput) {
        usernameInput.value = selectedItem.username;
        passwordInput.value = selectedItem.password;
      }
    }
  }
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


  closeUser() {
    const getFullElement = document.getElementById("getFull");

    if (getFullElement) {
      getFullElement.style.transform = "translateY(150%)";
      getFullElement.style.opacity = "0%";
      getFullElement.style.transition = "transform 1s, height 1.5s, opacity 0.7s";

      setTimeout(() => {
        getFullElement.style.transform = "translateY(-150%)";
      }, 800);
    }
  }


  async openEditModal() {
    const modal = await this.modalController.create({
      component: UserEditComponent
    });
    modal.present();
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
}
