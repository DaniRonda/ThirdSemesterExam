import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'User-Pay-Screen.component.html',
  styleUrls: ['User-Pay-Screen.scss'],
})
export class UserPayScreenComponent{
  private originalString: string = '';
  public stringWithSpaces: string = '';
  public holderName: string = '';
  public cvvNmb: string = '';
  public expM: string = '';
  public expY: string = '';
  cvvInput: HTMLInputElement | null = document.getElementById('cvvInputt') as HTMLInputElement;
  constructor(private router: Router,) {
    this.cvvInput = document.getElementById('cvvInputt') as HTMLInputElement;

    if (this.cvvInput) {
      this.cvvInput.addEventListener('click', () => {
        console.log('Clicked on CVV input');
      });
    } else {
      console.error('Element with ID "cvvInputt" not found');
    }

  }


  onInputChangeNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.originalString = inputElement.value.replace(/\D/g, '');
    if (this.originalString.length > 16) {
      this.originalString = this.originalString.slice(0, 15); // Limit to 15 characters

    }
    inputElement.value = this.originalString;
    this.originalString = this.originalString.replace(/[^0-9]/g, '')
    this.stringWithSpaces = this.addSpaces(this.originalString);
    console.log(this.stringWithSpaces)
  }


  addSpaces(str: string): string {
    // Use a regular expression to add a space every 4 characters
    return str.replace(/(.{4})/g, '$1 ');
  }


  onInputChangeName(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement) {
      this.originalString = inputElement.value.replace(/[^a-zA-Z\s]/g, '');

      // Add any additional logic you need here

      inputElement.value = this.originalString;
    }
    this.holderName = inputElement.value;
  }

  onInputChangeCVV(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.originalString = inputElement.value.replace(/\D/g, '');
    if (this.originalString.length > 3) {
      this.originalString = this.originalString.slice(0, 3); // Limit to 15 characters

    }
    inputElement.value = this.originalString;
    this.originalString = this.originalString.replace(/[^0-9]/g, '')
    this.stringWithSpaces = this.addSpaces(this.originalString);
    console.log(this.stringWithSpaces)
    this.cvvNmb = inputElement.value;
  }

  onSelectY(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.expY = inputElement.value;
  }

  onSelectM(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.expM = inputElement.value;
  }





// Create an instance of the class to initialize the event listeners


  handleMouseOver() {
    const frontElement = document.querySelector('.front') as HTMLElement;
    const backElement = document.querySelector('.back') as HTMLElement;

    if (frontElement && backElement) {
      frontElement.style.transform = 'perspective(1000px) rotateY(-180deg)';
      backElement.style.transform = 'perspective(1000px) rotateY(0deg)';
    }
  }

  handleMouseOut() {
    const frontElement = document.querySelector('.front') as HTMLElement;
    const backElement = document.querySelector('.back') as HTMLElement;

    if (frontElement && backElement) {
      frontElement.style.transform = 'perspective(1000px) rotateY(0deg)';
      backElement.style.transform = 'perspective(1000px) rotateY(180deg)';
    }
  }

  goBackToUser() {
    this.router.navigate(['UserScreen']);
  }
}
