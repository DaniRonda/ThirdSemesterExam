import { Component } from '@angular/core';

@Component({
  templateUrl: 'User-Pay-Screen.component.html',
  styleUrls: ['User-Pay-Screen.scss'],
})
export class UserPayScreenComponent {
  private originalString: string = '';
  private stringWithSpaces: string = '';
  constructor() {
    this.setupEventListeners();
  }
  private addSpaces(str: string): string {
    // Use a regular expression to add a space every 4 characters
    return str.replace(/(.{4})/g, '$1 ');
  }

  private setupEventListeners(): void {
    document.querySelector('.card-number-input')?.addEventListener('input', () => {
      this.originalString = (document.querySelector('.card-number-input') as HTMLInputElement).value;
      this.stringWithSpaces = this.addSpaces(this.originalString);
      (document.querySelector('.card-number-box') as HTMLElement).innerText = this.stringWithSpaces;
    });

    document.querySelector('.card-holder-input')?.addEventListener('input', () => {
      (document.querySelector('.card-holder-name') as HTMLElement).innerText =
          (document.querySelector('.card-holder-input') as HTMLInputElement).value;
    });

    // Add other event listeners here...

    document.getElementById('numericInput')?.addEventListener('input', function (this: HTMLInputElement) {
      let input = this.value.replace(/\D/g, ''); // Remove non-numeric characters
      if (input.length > 15) {
        input = input.slice(0, 15); // Limit to 15 characters
        this.value = input;
      }
    });
  }

  private goBackToUser(event: Event): boolean {
    event.preventDefault();
    const cardnmb = (document.getElementById('numericInput') as HTMLInputElement).value;
    const cardHolder = (document.getElementById('cardHolderInput') as HTMLInputElement).value;
    // ... (similarly get other values)

    if (cardnmb.trim() !== '' && cardHolder.trim() !== '') {
      window.location.href = 'User.html';
      return false;
    }

    return true;
  }

}
