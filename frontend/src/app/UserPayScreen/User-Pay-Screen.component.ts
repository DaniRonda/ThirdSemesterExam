import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
  constructor() {
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
    this.originalString = inputElement.value;
    this.stringWithSpaces = this.addSpaces(this.originalString);
    console.log(this.stringWithSpaces)
  }


  addSpaces(str: string): string {
    // Use a regular expression to add a space every 4 characters
    return str.replace(/(.{4})/g, '$1 ');
  }


  onInputChangeName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.holderName = inputElement.value;
  }

  onInputChangeCVV(event: Event) {
    const inputElement = event.target as HTMLInputElement;
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
}
