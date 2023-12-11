import {Component, ElementRef} from '@angular/core';
import {faCoffee, faMinus, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'User-Screen.component.html',
  styleUrls: ['User-Screen.component.scss'],
})

export class UserScreenComponent {

  constructor(private el: ElementRef, private router: Router,) {

  }

  menubase: number = 0;
  baseprice = 0;
  newprice = 0;
  cheeseprice = 0;
  baconprice = 0;
  pickleprice = 0;
  onionprice = 0;
  tomatoprice = 0;
  lettuceprice = 0;
  ketchupprice = 0;
  mayoprice = 0;
  menucontent = document.getElementById("menucontent");
  burgercontent = document.getElementById("burgercontent");
  headerMenu = document.getElementById("headerMenu");
  headerBurger = document.getElementById("headerBurger");
  optionsopen= false;
  data:string[] = [];
    orderList: HTMLElement | null = document.getElementById("myList");


  priceText = document.getElementById("right")
  totalPrice = "";

  blockblink(): void {
    const optionsPane = document.getElementById("optionspane") as HTMLElement;

    optionsPane.style.borderColor = "#B33F40";

    // Uncomment the following lines if you want to use setTimeout

    setTimeout(() => {
        optionsPane.style.borderColor = "#5f725d";
    }, 150);

    setTimeout(() => {
        optionsPane.style.borderColor = "#B33F40";
    }, 300);

    setTimeout(() => {
        optionsPane.style.borderColor = "#5f725d";
    }, 450);

  }
  openMenues(): void {
    if (!this.optionsopen){
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");

    });

    const headerMenu = document.getElementById("headerMenu") as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== "menucontent") {
        contents.style.transform = "translateX(100%)";
      }
    });

    const menucontent = document.getElementById("menucontent") as HTMLElement;
    menucontent.style.transform = "translateX(0)";

    document.getElementById("burgercontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sidescontent")!.style.transitionDelay = "0.0s";
    document.getElementById("menucontent")!.style.transitionDelay = "0.3s";
    document.getElementById("sodacontent")!.style.transitionDelay = "0.0s";
    document.getElementById("chickencontent")!.style.transitionDelay = "0.0s";
    document.getElementById("dessertcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("saladcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("vegancontent")!.style.transitionDelay = "0.0s";
    }
    else{
      this.blockblink();
    }
  }
  openBurger(): void {
    if (!this.optionsopen) {
      const contents = document.querySelectorAll('.tab-links');
      contents.forEach((content: Element) => {
        content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
      });

      const headerMenu = document.getElementById("headerBurger") as HTMLElement;
      headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

      const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

      contentscrolls.forEach((contents: HTMLElement) => {
        if (contents.textContent !== "burgercontent") {
          contents.style.transform = "translateX(100%)";
        }
      });

      const menucontent = document.getElementById("burgercontent") as HTMLElement;
      menucontent.style.transform = "translateX(0)";

      document.getElementById("burgercontent")!.style.transitionDelay = "0.3s";
      document.getElementById("sidescontent")!.style.transitionDelay = "0.0s";
      document.getElementById("menucontent")!.style.transitionDelay = "0.0s";
      document.getElementById("sodacontent")!.style.transitionDelay = "0.0s";
      document.getElementById("chickencontent")!.style.transitionDelay = "0.0s";
      document.getElementById("dessertcontent")!.style.transitionDelay = "0.0s";
      document.getElementById("saladcontent")!.style.transitionDelay = "0.0s";
      document.getElementById("vegancontent")!.style.transitionDelay = "0.0s";
    }
    else this.blockblink();
  }
  openSides(): void {
    if (!this.optionsopen) {
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
    });

    const headerMenu = document.getElementById("headerSides") as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== "sidescontent") {
        contents.style.transform = "translateX(100%)";
      }
    });

    const menucontent = document.getElementById("sidescontent") as HTMLElement;
    menucontent.style.transform = "translateX(0)";

    document.getElementById("burgercontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sidescontent")!.style.transitionDelay = "0.3s";
    document.getElementById("menucontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sodacontent")!.style.transitionDelay = "0.0s";
    document.getElementById("chickencontent")!.style.transitionDelay = "0.0s";
    document.getElementById("dessertcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("saladcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("vegancontent")!.style.transitionDelay = "0.0s";
    }
    else this.blockblink();
  }
  openSoda(): void {
    if (!this.optionsopen) {
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
    });

    const headerMenu = document.getElementById("headerSoda") as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== "sodacontent") {
        contents.style.transform = "translateX(100%)";
      }
    });

    const menucontent = document.getElementById("sodacontent") as HTMLElement;
    menucontent.style.transform = "translateX(0)";

    document.getElementById("burgercontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sidescontent")!.style.transitionDelay = "0.0s";
    document.getElementById("menucontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sodacontent")!.style.transitionDelay = "0.3s";
    document.getElementById("chickencontent")!.style.transitionDelay = "0.0s";
    document.getElementById("dessertcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("saladcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("vegancontent")!.style.transitionDelay = "0.0s";
    }
    else this.blockblink();
  }
  openChicken(): void {
    if (!this.optionsopen) {
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
    });

    const headerMenu = document.getElementById("headerChicken") as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== "chickencontent") {
        contents.style.transform = "translateX(100%)";
      }
    });

    const menucontent = document.getElementById("chickencontent") as HTMLElement;
    menucontent.style.transform = "translateX(0)";

    document.getElementById("burgercontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sidescontent")!.style.transitionDelay = "0.0s";
    document.getElementById("menucontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sodacontent")!.style.transitionDelay = "0.0s";
    document.getElementById("chickencontent")!.style.transitionDelay = "0.3s";
    document.getElementById("dessertcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("saladcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("vegancontent")!.style.transitionDelay = "0.0s";
    }
    else this.blockblink();
  }
  openDessert(): void {
    if (!this.optionsopen) {
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
    });

    const headerMenu = document.getElementById("headerDessert") as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== "dessertcontent") {
        contents.style.transform = "translateX(100%)";
      }
    });

    const menucontent = document.getElementById("dessertcontent") as HTMLElement;
    menucontent.style.transform = "translateX(0)";

    document.getElementById("burgercontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sidescontent")!.style.transitionDelay = "0.0s";
    document.getElementById("menucontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sodacontent")!.style.transitionDelay = "0.0s";
    document.getElementById("chickencontent")!.style.transitionDelay = "0.0s";
    document.getElementById("dessertcontent")!.style.transitionDelay = "0.3s";
    document.getElementById("saladcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("vegancontent")!.style.transitionDelay = "0.0s";
    }
    else this.blockblink();
  }
  openSalad(): void {
    if (!this.optionsopen) {
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
    });

    const headerMenu = document.getElementById("headerSalads") as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== "saladcontent") {
        contents.style.transform = "translateX(100%)";
      }
    });

    const menucontent = document.getElementById("saladcontent") as HTMLElement;
    menucontent.style.transform = "translateX(0)";

    document.getElementById("burgercontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sidescontent")!.style.transitionDelay = "0.0s";
    document.getElementById("menucontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sodacontent")!.style.transitionDelay = "0.0s";
    document.getElementById("chickencontent")!.style.transitionDelay = "0.0s";
    document.getElementById("dessertcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("saladcontent")!.style.transitionDelay = "0.3s";
    document.getElementById("vegancontent")!.style.transitionDelay = "0.0s";
    }
    else this.blockblink();
  }
  openVegan(): void {
    if (!this.optionsopen) {
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
    });

    const headerMenu = document.getElementById("headerVegan") as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");

    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;

    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== "vegancontent") {
        contents.style.transform = "translateX(100%)";
      }
    });

    const menucontent = document.getElementById("vegancontent") as HTMLElement;
    menucontent.style.transform = "translateX(0)";

    document.getElementById("burgercontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sidescontent")!.style.transitionDelay = "0.0s";
    document.getElementById("menucontent")!.style.transitionDelay = "0.0s";
    document.getElementById("sodacontent")!.style.transitionDelay = "0.0s";
    document.getElementById("chickencontent")!.style.transitionDelay = "0.0s";
    document.getElementById("dessertcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("saladcontent")!.style.transitionDelay = "0.0s";
    document.getElementById("vegancontent")!.style.transitionDelay = "0.3s";
    }
    else this.blockblink();
  }

  closeOptions(): void {
    this.optionsopen = false;

    const optionsPane = document.getElementById("optionspane") as HTMLElement;
    optionsPane.style.transform = "translateY(-150%)";
    optionsPane.style.opacity = "0%";
    optionsPane.style.transition = "transform 1s, height 1.5s, opacity 0.7s";

    const resetOptionStyles = (optionId: string): void => {
      const option = document.getElementById(optionId) as HTMLElement;
      option.style.maxHeight = "100%";
      option.style.maxWidth = "100%";
    };

    resetOptionStyles("sizeoption");
    resetOptionStyles("sodaoption");
    resetOptionStyles("cheeseoption");
    resetOptionStyles("baconoption");
    resetOptionStyles("picklesoption");
    resetOptionStyles("onionsoption");
    resetOptionStyles("tomatooption");
    resetOptionStyles("lettuceoption");
    resetOptionStyles("ketchupoption");
    resetOptionStyles("mayooption");

    const resetOptionTitles = (optionId: string, title: string): void => {
      const titleElement = document.getElementById(optionId + "title");
      if (titleElement) {
        titleElement.innerHTML = title;
      }
    };

    resetOptionTitles("sizeoption", "Menu size");
    resetOptionTitles("sodaoption", "Drinks");
    resetOptionTitles("cheeseoption", "No/Extra Cheese");
    resetOptionTitles("baconoption", "No/Extra Bacon");
    resetOptionTitles("picklesoption", "No/Extra Pickles");
    resetOptionTitles("onionsoption", "No/Extra Onions");
    resetOptionTitles("tomatooption", "No/Extra Tomatoes");
    resetOptionTitles("lettuceoption", "No/Extra Lettuce");
    resetOptionTitles("ketchupoption", "No/Extra Ketchup");
    resetOptionTitles("mayooption", "No/Extra Mayonnaise");

    const resetRadioInputs = (radioGroupName: string, defaultCheckedValue: string): void => {
      const radioInputs = document.querySelectorAll(`input[name="${radioGroupName}"]`) as NodeListOf<HTMLInputElement>;
      radioInputs.forEach((input: HTMLInputElement) => {
        input.checked = input.value === defaultCheckedValue;
      });
    };

    resetRadioInputs("menuRadio", "2");
    resetRadioInputs("sodaRadio", "1");
    resetRadioInputs("myRadio", "2");
    resetRadioInputs("baconRadio", "2");
    resetRadioInputs("pickleRadio", "2");
    resetRadioInputs("onionRadio", "2");
    resetRadioInputs("tomatoRadio", "2");
    resetRadioInputs("lettuceRadio", "2");
    resetRadioInputs("ketchupRadio", "2");
    resetRadioInputs("mayoRadio", "2");

    const radioElement = document.getElementById("sizeRadio2") as HTMLInputElement | null;
    const radioElement2 = document.getElementById("sodaRadio1") as HTMLInputElement | null;


    if (radioElement && radioElement2) {
      radioElement.checked = true;
      radioElement2.checked = true;
    }

    this.menubase = 0;
    this.newprice = 0;
    this.cheeseprice = 0;
    this.baconprice = 0;
    this.pickleprice = 0;
    this.onionprice = 0;
    this.tomatoprice = 0;
    this.lettuceprice = 0;
    this.ketchupprice = 0;
    this.mayoprice = 0;
  }

  showMenuOptions(): void {
    const optionsPane = document.getElementById("optionspane") as HTMLElement;

    if (!this.optionsopen) {
      this.optionsopen = true;
      optionsPane.style.transform = "translateY(0px)";
      optionsPane.style.opacity = "100%";
      optionsPane.style.transition = "transform 1.7s, height 1.5s, opacity 1s";
    } else {
      this.blockblink();
    }
  }

  removeSizeOption(): void {
    const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;

    if (sizeOption) {
      sizeOption.style.maxHeight = "0%";
      sizeOption.style.maxWidth = "0%";
    }

    const sizeOptionTitle = document.getElementById("sizeoptiontitle");
    if (sizeOptionTitle) {
      sizeOptionTitle.innerText = "";
    }
  }
  removeSodaOption(): void {
    const sodaOption = document.getElementById("sodaoption") as HTMLElement | null;

    if (sodaOption) {
      sodaOption.style.maxHeight = "0%";
      sodaOption.style.maxWidth = "0%";
    }

    const sodaOptionTitle = document.getElementById("sodaoptiontitle");
    if (sodaOptionTitle) {
      sodaOptionTitle.innerText = "";
    }
  }

  removeCheeseOption(): void {
    const cheeseOption = document.getElementById("cheeseoption") as HTMLElement | null;

    if (cheeseOption) {
      cheeseOption.style.maxHeight = "0%";
      cheeseOption.style.maxWidth = "0%";
    }

    const cheeseOptionTitle = document.getElementById("cheeseoptiontitle");
    if (cheeseOptionTitle) {
      cheeseOptionTitle.innerText = "";
    }
  }

  removeBaconOption(): void {
    const baconOption = document.getElementById("baconoption") as HTMLElement | null;

    if (baconOption) {
      baconOption.style.maxHeight = "0%";
      baconOption.style.maxWidth = "0%";
    }

    const baconOptionTitle = document.getElementById("baconoptiontitle");
    if (baconOptionTitle) {
      baconOptionTitle.innerText = "";
    }
  }

  removePickleOption(): void {
    const pickleOption = document.getElementById("picklesoption") as HTMLElement | null;

    if (pickleOption) {
      pickleOption.style.maxHeight = "0%";
      pickleOption.style.maxWidth = "0%";
    }

    const pickleOptionTitle = document.getElementById("picklesoptiontitle");
    if (pickleOptionTitle) {
      pickleOptionTitle.innerText = "";
    }
  }

  removeOnionOption(): void {
    const onionOption = document.getElementById("onionsoption") as HTMLElement | null;

    if (onionOption) {
      onionOption.style.maxHeight = "0%";
      onionOption.style.maxWidth = "0%";
    }

    const onionOptionTitle = document.getElementById("onionsoptiontitle");
    if (onionOptionTitle) {
      onionOptionTitle.innerText = "";
    }
  }

  removeTomatoOption(): void {
    const tomatoOption = document.getElementById("tomatooption") as HTMLElement | null;

    if (tomatoOption) {
      tomatoOption.style.maxHeight = "0%";
      tomatoOption.style.maxWidth = "0%";
    }

    const tomatoOptionTitle = document.getElementById("tomatooptiontitle");
    if (tomatoOptionTitle) {
      tomatoOptionTitle.innerText = "";
    }
  }

  removeLettuceOption(): void {
    const lettuceOption = document.getElementById("lettuceoption") as HTMLElement | null;

    if (lettuceOption) {
      lettuceOption.style.maxHeight = "0%";
      lettuceOption.style.maxWidth = "0%";
    }

    const lettuceOptionTitle = document.getElementById("lettuceoptiontitle");
    if (lettuceOptionTitle) {
      lettuceOptionTitle.innerText = "";
    }
  }

  removeKetchupOption(): void {
    const ketchupOption = document.getElementById("ketchupoption") as HTMLElement | null;

    if (ketchupOption) {
      ketchupOption.style.maxHeight = "0%";
      ketchupOption.style.maxWidth = "0%";
    }

    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");
    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "";
    }
  }

  removeMayoOption(): void {
    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;

    if (mayoOption) {
      mayoOption.style.maxHeight = "0%";
      mayoOption.style.maxWidth = "0%";
    }

    const mayoOptionTitle = document.getElementById("mayooptiontitle");
    if (mayoOptionTitle) {
      mayoOptionTitle.innerText = "";
    }
  }
  removeAllOptions(){
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.removeMayoOption();
  }
  uncheck(): void {
    const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement;
    const sizeRadio2 = document.getElementById("sizeRadio2") as HTMLInputElement;

    if (sodaRadio1) {
      sodaRadio1.checked = false;
    }

    if (sizeRadio2) {
      sizeRadio2.checked = false;
    }
  }

  showMenuOptions1(): void {
    this.baseprice = 75;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackCheese Double Patty Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showMenuOptions2(): void {
    this.baseprice = 89;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "BigWack Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showMenuOptions3(): void {
    this.baseprice = 60;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackCheese Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showMenuOptions4(): void {
    this.baseprice = 79;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu4.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackChicken Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeTomatoOption();

    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Sauce";
    }

    this.showMenuOptions();
  }
  showMenuOptions5(): void {
    this.baseprice = 89;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu5.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackMexico Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showMenuOptions6(): void {
    this.baseprice = 99;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu6.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "DoublePounder  Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showMenuOptions7(): void {
    this.baseprice = 99;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu7.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "All-In-One  Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showMenuOptions8(): void {
    this.baseprice = 69;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu8.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackNuggets Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showMenuOptions9(): void {
    this.baseprice = 89;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/menu9.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Chicken Box  Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }

    this.showMenuOptions();
  }
  showBurgerOptions1(): void {
    this.baseprice = 69;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/burger1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "All-In-One burger.";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.uncheck();


    this.showMenuOptions();
  }
  showBurgerOptions2(): void {
    this.baseprice = 55;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/burger2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "BigWack";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.uncheck();


    this.showMenuOptions();
  }
  showBurgerOptions3(): void {
    this.baseprice = 30;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/burger3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackCheese";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.uncheck();


    this.showMenuOptions();
  }
  showBurgerOptions4(): void {
    this.baseprice = 45;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/burger4.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackChicken";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeMayoOption();
    this.uncheck();


    this.showMenuOptions();
  }
  showBurgerOptions5(): void {
    this.baseprice = 40;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/burger5.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackCheese Double Patty Menu";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.uncheck();


    this.showMenuOptions();
  }
  showBurgerOptions6(): void {
    this.baseprice = 59;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/burger6.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackBacon";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.uncheck();


    this.showMenuOptions();

  }
  showSidesOptions1(): void {
    this.baseprice = 50;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackNuggets Large";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();
    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }

    this.showMenuOptions();
  }
  showSidesOptions2(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackNuggets";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();
    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }

    this.showMenuOptions();
  }
  showSidesOptions3(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackChileCheese";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();
    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }

    this.showMenuOptions();
  }
  showSidesOptions4(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides4.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackFries Large";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();
    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }

    this.showMenuOptions();
  }
  showSidesOptions5(): void {
    this.baseprice = 15;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides5.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackFries";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();
    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }

    this.showMenuOptions();
  }
  showSidesOptions6(): void {
    this.baseprice = 30;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides6.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackSticks";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();

    this.showMenuOptions();
  }
  showSodaOptions1(): void {
    this.baseprice = 25;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/soda1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "CocaCola";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.removeMayoOption();
    const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;

    if (sodaRadio1) {
      sodaRadio1.checked = false;
    }

    const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;

    if (sizeOption) {
      sizeOption.style.width = "100%";
      sizeOption.style.left = "30%";
    }

    const sizeOptionTitle = document.getElementById("sizeoptiontitle");
    if (sizeOptionTitle) {
      sizeOptionTitle.innerText = "Soda Size";
    }

    this.showMenuOptions();
  }
  showSodaOptions2(): void {
    this.baseprice = 25;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/soda2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Pepsi";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.removeMayoOption();
    const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;

    if (sodaRadio1) {
      sodaRadio1.checked = false;
    }

    const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;

    if (sizeOption) {
      sizeOption.style.width = "100%";
      sizeOption.style.left = "30%";
    }

    const sizeOptionTitle = document.getElementById("sizeoptiontitle");
    if (sizeOptionTitle) {
      sizeOptionTitle.innerText = "Soda Size";
    }

    this.showMenuOptions();
  }
  showSodaOptions3(): void {
    this.baseprice = 25;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/soda3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Sprite";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.removeMayoOption();
    const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;

    if (sodaRadio1) {
      sodaRadio1.checked = false;
    }

    const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;

    if (sizeOption) {
      sizeOption.style.width = "100%";
      sizeOption.style.left = "30%";
    }

    const sizeOptionTitle = document.getElementById("sizeoptiontitle");
    if (sizeOptionTitle) {
      sizeOptionTitle.innerText = "Soda Size";
    }

    this.showMenuOptions();
  }
  showSodaOptions4(): void {
    this.baseprice = 25;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/soda4.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Fanta";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.removeMayoOption();
    const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;

    if (sodaRadio1) {
      sodaRadio1.checked = false;
    }

    const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;

    if (sizeOption) {
      sizeOption.style.width = "100%";
      sizeOption.style.left = "30%";
    }

    const sizeOptionTitle = document.getElementById("sizeoptiontitle");
    if (sizeOptionTitle) {
      sizeOptionTitle.innerText = "Soda Size";
    }

    this.showMenuOptions();
  }
  showChickenOptions1(): void {
    this.baseprice = 45;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/chicken1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackChicken";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeMayoOption();
    this.uncheck();

    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }
    this.showMenuOptions();
  }
  showChickenOptions2(): void {
    this.baseprice = 30;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/chicken2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Chicken Strips";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();

    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }
    this.showMenuOptions();
  }
  showChickenOptions3(): void {
    this.baseprice = 50;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackNuggets Large";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();

    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }
    this.showMenuOptions();
  }
  showChickenOptions4(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackNuggets";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();

    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }
    this.showMenuOptions();
  }
  showChickenOptions5(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/sides3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackChiliCheese";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.uncheck();

    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");

    if (ketchupOptionTitle) {
      ketchupOptionTitle.innerText = "No/Extra Dressing";
    }
    this.showMenuOptions();
  }
  showDessertOptions1(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Sundeez Caramel";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions2(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Sundeez Strawberry";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions3(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Sundeez Chocolate";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions4(): void {
    this.baseprice = 25;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert4.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackFlurry Chocobits";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions5(): void {
    this.baseprice = 25;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert5.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackFlurry MnM";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions6(): void {
    this.baseprice = 30;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert6.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Oreo Milkshake";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions7(): void {
    this.baseprice = 15;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert7.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Light Cookie";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions8(): void {
    this.baseprice = 15;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert8.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Dark Cookie";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions9(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert9.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Donut";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showDessertOptions10(): void {
    this.baseprice = 20;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/dessert10.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Berliner";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeAllOptions();
    this.uncheck();
    this.showMenuOptions();
  }
  showSaladOptions1(): void {
    this.baseprice = 40;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/salad1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Chicken Strip Salad";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.uncheck();

    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;

    if (mayoOption) {
      mayoOption.style.width = "100%";
      mayoOption.style.left = "33%";
    }

    const mayoOptionTitle = document.getElementById("mayooptiontitle");

    if (mayoOptionTitle) {
      mayoOptionTitle.innerText = "Salad Dressing";
    }
    this.showMenuOptions();
  }
  showSaladOptions2(): void {
    this.baseprice = 30;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/salad2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Small Salad";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.uncheck();

    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;

    if (mayoOption) {
      mayoOption.style.width = "100%";
      mayoOption.style.left = "33%";
    }

    const mayoOptionTitle = document.getElementById("mayooptiontitle");

    if (mayoOptionTitle) {
      mayoOptionTitle.innerText = "Salad Dressing";
    }
    this.showMenuOptions();
  }
  showSaladOptions3(): void {
    this.baseprice = 40;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/salad3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Feta Salad";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.uncheck();

    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;

    if (mayoOption) {
      mayoOption.style.width = "100%";
      mayoOption.style.left = "33%";
    }

    const mayoOptionTitle = document.getElementById("mayooptiontitle");

    if (mayoOptionTitle) {
      mayoOptionTitle.innerText = "Salad Dressing";
    }
    this.showMenuOptions();
  }
  showSaladOptions4(): void {
    this.baseprice = 49;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/salad4.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Chicken Strip' Salad Supreme";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.uncheck();

    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;

    if (mayoOption) {
      mayoOption.style.width = "100%";
      mayoOption.style.left = "33%";
    }

    const mayoOptionTitle = document.getElementById("mayooptiontitle");

    if (mayoOptionTitle) {
      mayoOptionTitle.innerText = "Salad Dressing";
    }
    this.showMenuOptions();
  }
  showSaladOptions5(): void {
    this.baseprice = 40;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/salad5.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackSalad";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.uncheck();

    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;

    if (mayoOption) {
      mayoOption.style.width = "100%";
      mayoOption.style.left = "33%";
    }

    const mayoOptionTitle = document.getElementById("mayooptiontitle");

    if (mayoOptionTitle) {
      mayoOptionTitle.innerText = "Salad Dressing";
    }
    this.showMenuOptions();
  }
  showVeganOptions1(): void {
    this.baseprice = 69;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/vegan1.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackVegan Deluxe";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removeMayoOption();
    this.removeKetchupOption();
    this.uncheck();

    this.showMenuOptions();
  }
  showVeganOptions2(): void {
    this.baseprice = 60;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/vegan2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackVegan";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removeMayoOption();
    this.removeKetchupOption();
    this.uncheck();

    this.showMenuOptions();
  }
  showVeganOptions3(): void {
    this.baseprice = 69;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/vegan3.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "WackVegan Supreme";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removeMayoOption();
    this.removeKetchupOption();
    this.uncheck();

    this.showMenuOptions();
  }
  showVeganOptions4(): void {
    this.baseprice = 30;

    const image = document.getElementById("optionImg") as HTMLImageElement;
    if (image) {
      image.src = "assets/salad2.png";
    }

    const title = document.getElementById("optionTitle");
    if (title) {
      title.innerHTML = "Small Salad";
    }

    const pricetext = document.getElementById("priceTitle");
    if (pricetext) {
      pricetext.innerHTML = "Price: " + this.baseprice + "DKK";
    }
    this.removeSizeOption();
    this.removeSodaOption();
    this.removeCheeseOption();
    this.removeBaconOption();
    this.removePickleOption();
    this.removeOnionOption();
    this.removeTomatoOption();
    this.removeLettuceOption();
    this.removeKetchupOption();
    this.uncheck();

    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;

    if (mayoOption) {
      mayoOption.style.width = "100%";
      mayoOption.style.left = "33%";
    }

    const mayoOptionTitle = document.getElementById("mayooptiontitle");

    if (mayoOptionTitle) {
      mayoOptionTitle.innerText = "Salad Dressing";
    }
    this.showMenuOptions();
  }
  priceTitle = "";
  smallClicked(): void {
    const sizeRadio1 = document.getElementById("sizeRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (sizeRadio1 && priceTitle) {
      if (sizeRadio1.checked) {
        this.newprice = -10;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  mediumClicked(): void {
    const sizeRadio2 = document.getElementById("sizeRadio2") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (sizeRadio2 && priceTitle) {
      if (sizeRadio2.checked) {
        this.newprice = 0;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  largeClicked(): void {
    const sizeRadio3 = document.getElementById("sizeRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (sizeRadio3 && priceTitle) {
      if (sizeRadio3.checked) {
        this.newprice = 10;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noCheeseClicked(): void {
    const myRadio1 = document.getElementById("myRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (myRadio1 && priceTitle) {
      if (myRadio1.checked) {
        this.newprice = -3;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraCheeseClicked(): void {
    const myRadio3 = document.getElementById("myRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (myRadio3 && priceTitle) {
      if (myRadio3.checked) {
        this.newprice = 3;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noBaconClicked(): void {
    const baconRadio1 = document.getElementById("baconRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (baconRadio1 && priceTitle) {
      if (baconRadio1.checked) {
        this.newprice = -5;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraBaconClicked(): void {
    const baconRadio3 = document.getElementById("baconRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (baconRadio3 && priceTitle) {
      if (baconRadio3.checked) {
        this.newprice = 5;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noPickleClicked(): void {
    const pickleRadio1 = document.getElementById("pickleRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (pickleRadio1 && priceTitle) {
      if (pickleRadio1.checked) {
        this.newprice = -2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraPickleClicked(): void {
    const pickleRadio3 = document.getElementById("pickleRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (pickleRadio3 && priceTitle) {
      if (pickleRadio3.checked) {
        this.newprice = 2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noOnionClicked(): void {
    const onionRadio1 = document.getElementById("onionRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (onionRadio1 && priceTitle) {
      if (onionRadio1.checked) {
        this.newprice = -2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraOnionClicked(): void {
    const onionRadio3 = document.getElementById("onionRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (onionRadio3 && priceTitle) {
      if (onionRadio3.checked) {
        this.newprice = 2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noTomatoClicked(): void {
    const tomatoRadio1 = document.getElementById("tomatoRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (tomatoRadio1 && priceTitle) {
      if (tomatoRadio1.checked) {
        this.newprice = -2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraTomatoClicked(): void {
    const tomatoRadio3 = document.getElementById("tomatoRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (tomatoRadio3 && priceTitle) {
      if (tomatoRadio3.checked) {
        this.newprice = 2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noLettuceClicked(): void {
    const lettuceRadio1 = document.getElementById("lettuceRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (lettuceRadio1 && priceTitle) {
      if (lettuceRadio1.checked) {
        this.newprice = -2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraLettuceClicked(): void {
    const lettuceRadio3 = document.getElementById("lettuceRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (lettuceRadio3 && priceTitle) {
      if (lettuceRadio3.checked) {
        this.newprice = 2;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noKetchupClicked(): void {
    const ketchupRadio1 = document.getElementById("ketchupRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (ketchupRadio1 && priceTitle) {
      if (ketchupRadio1.checked) {
        this.newprice = -5;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraKetchupClicked(): void {
    const ketchupRadio3 = document.getElementById("ketchupRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (ketchupRadio3 && priceTitle) {
      if (ketchupRadio3.checked) {
        this.newprice = 5;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  noMayoClicked(): void {
    const mayoRadio1 = document.getElementById("mayoRadio1") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (mayoRadio1 && priceTitle) {
      if (mayoRadio1.checked) {
        this.newprice = -5;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }

  extraMayoClicked(): void {
    const mayoRadio3 = document.getElementById("mayoRadio3") as HTMLInputElement | null;
    const priceTitle = document.getElementById("priceTitle");

    if (mayoRadio3 && priceTitle) {
      if (mayoRadio3.checked) {
        this.newprice = 5;
      }

      const printprice =
        this.baseprice +
        this.newprice +
        this.cheeseprice +
        this.baconprice +
        this.pickleprice +
        this.onionprice +
        this.tomatoprice +
        this.lettuceprice +
        this.ketchupprice +
        this.mayoprice;

      priceTitle.innerHTML = "Price: " + printprice + "DKK";
    }
  }
  setTotal(): void {

    var totalPrice = 0;
    const priceText = document.getElementById("right");

    if (priceText) {
      this.data.forEach(function (inputString) {
        var match = inputString.match(/Price: (\d+)DKK/);

        if (match && match[1]) {
          var price = parseInt(match[1], 10);
          totalPrice += price;
        } else {
          console.log("Price not found in the string:", inputString);
        }
      });

      priceText.innerHTML = totalPrice + "DKK";
    }
  }
  renderItems(): void {
    const list = document.getElementById("myList") as HTMLUListElement | null;

    if (list && this.data.length > -1) {
      console.log("list rendered")
      list.innerHTML = "";
      this.data.forEach((item: string) => {
        let li = document.createElement("li") as HTMLLIElement;
        li.innerText = item;
        li.classList.add("orderParts");


        li.style.cursor = 'pointer';
        li.style.textAlign = 'center';
        li.style.borderBottom = 'solid 1px silver';
        li.style.paddingBottom = '8px';
        li.style.paddingTop = '8px';

        li.addEventListener('mouseover', () => {
          li.style.color = 'red';
        });

        li.addEventListener('mouseout', () => {
          // Reset styles on mouseout
          li.style.color = '';
        });
        li.addEventListener('click', () => this.removeItem(item));

        list.appendChild(li);

      });


      console.log(this.data);
      this.setTotal();
    }
  }
  submitCurrentItems(): void {
    const itemname = document.getElementById("optionTitle")?.textContent || "";
    const printprice = this.baseprice + this.newprice + this.cheeseprice + this.baconprice + this.pickleprice + this.onionprice + this.tomatoprice + this.lettuceprice + this.ketchupprice + this.mayoprice;

    const size_value = this.getRadioValue("menuRadio");
    const soda_value = this.getRadioValue("sodaRadio");
    const bacon_value = this.getRadioValue("baconRadio");
    const cheese_value = this.getRadioValue("myRadio");
    const pickles_value = this.getRadioValue("pickleRadio");
    const onion_value = this.getRadioValue("onionRadio");
    const tomato_value = this.getRadioValue("tomatoRadio");
    const lettuce_value = this.getRadioValue("lettuceRadio");
    const ketchup_value = this.getRadioValue("ketchupRadio");
    const mayo_value = this.getRadioValue("mayoRadio");

    const finalitemstring = `${itemname}:\nPrice: ${printprice}DKK\n${size_value}${soda_value}${bacon_value}${cheese_value}${pickles_value}${onion_value}${tomato_value}${lettuce_value}${ketchup_value}${mayo_value};`;
    this.data.push(finalitemstring);

    console.log("hi" + size_value);
    this.renderItems();
    this.closeOptions();
  }

  getRadioValue(radioName: string): string {
    const radioButtons = document.getElementsByName(radioName);
    const selectedRadio = Array.from(radioButtons).find((radio) => (radio as HTMLInputElement).checked);
    return selectedRadio ? (selectedRadio as HTMLInputElement).value : "";
  }

    openPayScreen() {
        if (this.data.length > 0) {
          this.router.navigate(['UserPayScreen']);
        } else {
            alert("Please add items to your order before proceeding to payment.");
        }
        return false;
    }

  removeItem(item: string) {
    console.log("clicked")
    const indexToRemove = this.data.indexOf(item);
    if (indexToRemove !== -1) {
      console.log("clicked2")
      this.data.splice(indexToRemove, 1);
      this.setTotal();
      this.renderItems();
    }
  }




  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly faXmark = faXmark;


}


