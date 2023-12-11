import {Component, ElementRef, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

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
  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router,) {}

  logout() {
    this.router.navigate(['home']);
  }

  addOrder1() {
    var newOrderData = {
      title: "some new time",
      description: "WackCheese Double Patty Menu: Price: 75DKK Size: Medium- Soda: Cola- ;BigWack Menu: Price: 89DKK Size: Medium- Soda: Cola- ;"
    };

// Assuming you are inside the component class
    this.addOrder(newOrderData.title, newOrderData.description);
  }
  addOrder(orderNumber: string, description: string){
    const orderContainer = this.el.nativeElement.querySelector('#orderContainer');

    // Step 2: Create a new div element for the order using Renderer2
    const newOrder = this.renderer.createElement('div');
    this.renderer.addClass(newOrder, 'order');

    // Step 3: Create a button with (click) event
    const button = this.renderer.createElement('button');
    this.renderer.setProperty(button, 'textContent', '✔️');
    this.renderer.listen(button, 'click', () => this.removeOrder(newOrder));
    this.renderer.appendChild(newOrder, button);

    // Step 4: Add order header to the new order
    const orderHeader = this.renderer.createElement('div');
    this.renderer.addClass(orderHeader, 'orderHeader');
    const h1 = this.renderer.createElement('h1');
    this.renderer.setProperty(h1, 'textContent', 'Order: ' + orderNumber);
    this.renderer.appendChild(orderHeader, h1);
    this.renderer.appendChild(newOrder, orderHeader);

    // Step 4: Split the description into items using ";"
    const descriptionItems = description.split(";");

    // Step 5: Create an unordered list and add list items
    const ul = this.renderer.createElement('ul');
    descriptionItems.forEach(item => {
      const li = this.renderer.createElement('li');
      this.renderer.setProperty(li, 'textContent', item.trim());
      this.renderer.appendChild(ul, li);
    });

    // Step 6: Append the unordered list to the new order
    this.renderer.appendChild(newOrder, ul);

    // Step 7: Append the new order to the orderContainer
    this.renderer.appendChild(orderContainer, newOrder);
  }

  removeOrder(orderElement: HTMLElement): void {
    // Your logic to remove the order goes here
    orderElement.remove();
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

      console.log(currentTime);
    }, 1000);
  }



}
