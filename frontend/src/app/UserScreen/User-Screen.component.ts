import {Component, ElementRef} from '@angular/core';
import {faCoffee, faMinus, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {State} from "../state";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {Order, ResponseDto} from "../../models";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
@Component({
  templateUrl: 'User-Screen.component.html',
  styleUrls: ['User-Screen.component.scss'],
})
export class UserScreenComponent {
  constructor(private el: ElementRef, private router: Router, public fb: FormBuilder, public state: State,
              public http: HttpClient, public toastController: ToastController) {
  }
  menubase: number = 0;baseprice = 0;newprice = 0;cheeseprice = 0;
  baconprice = 0;pickleprice = 0;onionprice = 0;tomatoprice = 0;
  lettuceprice = 0;ketchupprice = 0;mayoprice = 0;
  menucontent = document.getElementById("menucontent");
  burgercontent = document.getElementById("burgercontent");
  headerMenu = document.getElementById("headerMenu");
  headerBurger = document.getElementById("headerBurger");
  optionsopen= false;data:string[] = [];
  orderList: HTMLElement | null = document.getElementById("myList");
  priceText = document.getElementById("right")
  totalPrice = "";
  blockblink(): void {
    const optionsPane = document.getElementById("optionspane") as HTMLElement;
    optionsPane.style.borderColor = "#B33F40";
    // Uncomment the following lines if you want to use setTimeout
    setTimeout(() => {
        optionsPane.style.borderColor = "#5f725d";}, 150);
    setTimeout(() => {
        optionsPane.style.borderColor = "#B33F40";}, 300);
    setTimeout(() => {
        optionsPane.style.borderColor = "#5f725d";}, 450);
    setTimeout(() => {
      optionsPane.style.borderColor = "#B33F40";}, 600);
    setTimeout(() => {
      optionsPane.style.borderColor = "#5f725d";}, 750);
  }
  private applyMenuTransition(selector: string, headerId: string, contentId: string): void {
    const contents = document.querySelectorAll('.tab-links');
    contents.forEach((content: Element) => {
      content.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.0rem #0a0c10);");
    });
    const headerMenu = document.getElementById(headerId) as HTMLElement;
    headerMenu.setAttribute("style", "-webkit-filter: drop-shadow(0 0 0.8rem #0a0c10);");
    const contentscrolls = document.querySelectorAll('.containerscroll') as NodeListOf<HTMLElement>;
    contentscrolls.forEach((contents: HTMLElement) => {
      if (contents.textContent !== contentId) {
        contents.style.transform = "translateX(100%)";
      }});
    const menucontent = document.getElementById(contentId) as HTMLElement;
    menucontent.style.transform = "translateX(0)";
    // Set transition delay for all content elements
    const contentElements = ["sidescontent", "menucontent", "sodacontent", "chickencontent", "dessertcontent", "saladcontent", "vegancontent", "burgercontent"];
    contentElements.forEach((elementId) => {
      document.getElementById(elementId)!.style.transitionDelay = elementId === contentId ? "0.3s" : "0.0s";
    });
  }

  openMenues(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerMenu', 'menucontent');
    } else {this.blockblink();}
  }
  openBurger(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerBurger', 'burgercontent');
    } else {this.blockblink();}
  }
  openSides(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerSides', 'sidescontent');
    } else {this.blockblink();}
  }
  openSoda(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerSoda', 'sodacontent');
    } else {this.blockblink();}
  }
  openChicken(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerChicken', 'chickencontent');
    } else {this.blockblink();}
  }
  openDessert(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerDessert', 'dessertcontent');
    } else {this.blockblink();}
  }
  openSalad(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerSalad', 'saladcontent');
    } else {this.blockblink();}
  }
  openVegan(): void {
    if (!this.optionsopen) {
      this.applyMenuTransition('.tab-links', 'headerVegan', 'vegancontent');
    } else {this.blockblink();}
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
    resetOptionStyles("sizeoption");resetOptionStyles("sodaoption");
    resetOptionStyles("cheeseoption");resetOptionStyles("baconoption");
    resetOptionStyles("picklesoption");resetOptionStyles("onionsoption");
    resetOptionStyles("tomatooption");resetOptionStyles("lettuceoption");
    resetOptionStyles("ketchupoption");resetOptionStyles("mayooption");

    const resetOptionTitles = (optionId: string, title: string): void => {
      const titleElement = document.getElementById(optionId + "title");
      if (titleElement) {titleElement.innerHTML = title;}
    };

    resetOptionTitles("sizeoption", "Menu size");resetOptionTitles("sodaoption", "Drinks");
    resetOptionTitles("cheeseoption", "No/Extra Cheese");resetOptionTitles("baconoption", "No/Extra Bacon");
    resetOptionTitles("picklesoption", "No/Extra Pickles");resetOptionTitles("onionsoption", "No/Extra Onions");
    resetOptionTitles("tomatooption", "No/Extra Tomatoes");resetOptionTitles("lettuceoption", "No/Extra Lettuce");
    resetOptionTitles("ketchupoption", "No/Extra Ketchup");resetOptionTitles("mayooption", "No/Extra Mayonnaise");

    const resetRadioInputs = (radioGroupName: string, defaultCheckedValue: string): void => {
      const radioInputs = document.querySelectorAll(`input[name="${radioGroupName}"]`) as NodeListOf<HTMLInputElement>;
      radioInputs.forEach((input: HTMLInputElement) => {
        input.checked = input.value === defaultCheckedValue;
      });
    };

    resetRadioInputs("menuRadio", "2");resetRadioInputs("sodaRadio", "1");
    resetRadioInputs("myRadio", "2");resetRadioInputs("baconRadio", "2");
    resetRadioInputs("pickleRadio", "2");resetRadioInputs("onionRadio", "2");
    resetRadioInputs("tomatoRadio", "2");resetRadioInputs("lettuceRadio", "2");
    resetRadioInputs("ketchupRadio", "2");resetRadioInputs("mayoRadio", "2");
    const radioElement = document.getElementById("sizeRadio2") as HTMLInputElement | null;
    const radioElement2 = document.getElementById("sodaRadio1") as HTMLInputElement | null;
    if (radioElement && radioElement2) {
      radioElement.checked = true; radioElement2.checked = true;
    }
    this.menubase = 0;this.newprice = 0;this.cheeseprice = 0;this.baconprice = 0;
    this.pickleprice = 0;this.onionprice = 0;this.tomatoprice = 0;this.lettuceprice = 0;
    this.ketchupprice = 0;this.mayoprice = 0;
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
    if (sizeOptionTitle) {sizeOptionTitle.innerText = "";}
  }
  removeSodaOption(): void {
    const sodaOption = document.getElementById("sodaoption") as HTMLElement | null;
    if (sodaOption) {
      sodaOption.style.maxHeight = "0%";
      sodaOption.style.maxWidth = "0%";
    }
    const sodaOptionTitle = document.getElementById("sodaoptiontitle");
    if (sodaOptionTitle) {sodaOptionTitle.innerText = "";}
  }

  removeCheeseOption(): void {
    const cheeseOption = document.getElementById("cheeseoption") as HTMLElement | null;
    if (cheeseOption) {
      cheeseOption.style.maxHeight = "0%";
      cheeseOption.style.maxWidth = "0%";
    }
    const cheeseOptionTitle = document.getElementById("cheeseoptiontitle");
    if (cheeseOptionTitle) {cheeseOptionTitle.innerText = "";}
  }

  removeBaconOption(): void {
    const baconOption = document.getElementById("baconoption") as HTMLElement | null;
    if (baconOption) {
      baconOption.style.maxHeight = "0%";
      baconOption.style.maxWidth = "0%";
    }
    const baconOptionTitle = document.getElementById("baconoptiontitle");
    if (baconOptionTitle) {baconOptionTitle.innerText = "";}
  }
  removePickleOption(): void {
    const pickleOption = document.getElementById("picklesoption") as HTMLElement | null;
    if (pickleOption) {
      pickleOption.style.maxHeight = "0%";
      pickleOption.style.maxWidth = "0%";
    }
    const pickleOptionTitle = document.getElementById("picklesoptiontitle");
    if (pickleOptionTitle) {pickleOptionTitle.innerText = "";}
  }
  removeOnionOption(): void {
    const onionOption = document.getElementById("onionsoption") as HTMLElement | null;
    if (onionOption) {
      onionOption.style.maxHeight = "0%";
      onionOption.style.maxWidth = "0%";
    }
    const onionOptionTitle = document.getElementById("onionsoptiontitle");
    if (onionOptionTitle) {onionOptionTitle.innerText = "";}
  }
  removeTomatoOption(): void {
    const tomatoOption = document.getElementById("tomatooption") as HTMLElement | null;
    if (tomatoOption) {
      tomatoOption.style.maxHeight = "0%";
      tomatoOption.style.maxWidth = "0%";
    }
    const tomatoOptionTitle = document.getElementById("tomatooptiontitle");
    if (tomatoOptionTitle) {tomatoOptionTitle.innerText = "";}
  }
  removeLettuceOption(): void {
    const lettuceOption = document.getElementById("lettuceoption") as HTMLElement | null;
    if (lettuceOption) {
      lettuceOption.style.maxHeight = "0%";
      lettuceOption.style.maxWidth = "0%";
    }
    const lettuceOptionTitle = document.getElementById("lettuceoptiontitle");
    if (lettuceOptionTitle) {lettuceOptionTitle.innerText = "";}
  }
  removeKetchupOption(): void {
    const ketchupOption = document.getElementById("ketchupoption") as HTMLElement | null;
    if (ketchupOption) {
      ketchupOption.style.maxHeight = "0%";
      ketchupOption.style.maxWidth = "0%";
    }
    const ketchupOptionTitle = document.getElementById("ketchupoptiontitle");
    if (ketchupOptionTitle) {ketchupOptionTitle.innerText = "";}
  }
  removeMayoOption(): void {
    const mayoOption = document.getElementById("mayooption") as HTMLElement | null;
    if (mayoOption) {
      mayoOption.style.maxHeight = "0%";
      mayoOption.style.maxWidth = "0%";
    }
    const mayoOptionTitle = document.getElementById("mayooptiontitle");
    if (mayoOptionTitle) {mayoOptionTitle.innerText = "";}
  }
  removeAllOptions(){
    this.removeSizeOption();this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();
    this.removePickleOption();this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();
    this.removeKetchupOption();this.removeMayoOption();
  }
  uncheck(): void {
    const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement;
    const sizeRadio2 = document.getElementById("sizeRadio2") as HTMLInputElement;
    if (sodaRadio1) {sodaRadio1.checked = false;} if (sizeRadio2) {sizeRadio2.checked = false;}
  }

  updateMenuOptions(
    baseprice: number, imageSrc: string, titleText: string,
    removeOptionFunctions: (() => void)[] = []
  ): void {
    if (!this.optionsopen) {
      this.baseprice = baseprice;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = imageSrc;}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = titleText;}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      for (const removeOption of removeOptionFunctions) {removeOption();}
    }
    this.showMenuOptions();
  }
  showMenuOptions1(): void {
    this.updateMenuOptions(75, "assets/menu1.png", "WackCheese Double Patty Menu");}
  showMenuOptions2(): void {
    this.updateMenuOptions(89, "assets/menu2.png", "BigWack Menu");}
  showMenuOptions3(): void {
    this.updateMenuOptions(60, "assets/menu3.png", "WackCheese Menu");}
  showMenuOptions4(): void {
    this.updateMenuOptions(
      79, "assets/menu4.png", "WackChicken Menu",
      [this.removeCheeseOption, this.removeBaconOption, this.removePickleOption, this.removeTomatoOption]);}
  showMenuOptions5(): void {
    this.updateMenuOptions(89, "assets/menu5.png", "WackMexico Menu");}
  showMenuOptions6(): void {
    this.updateMenuOptions(99, "assets/menu6.png", "DoublePounder  Menu");}
  showMenuOptions7(): void {
    this.updateMenuOptions(99, "assets/menu7.png", "All-In-One  Menu");}
  showMenuOptions8(): void {
    this.updateMenuOptions(69, "assets/menu8.png", "WackNuggets Menu");}
  showMenuOptions9(): void {
    this.updateMenuOptions(89, "assets/menu9.png", "Chicken Box  Menu");}

  showBurgerOptions1(): void {
    this.updateMenuOptions(
      69, "assets/burger1.png", "All-In-One burger.",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck]);}

  showBurgerOptions2(): void {
    this.updateMenuOptions(
      55, "assets/burger2.png", "BigWack",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck]);}
  showBurgerOptions3(): void {
    this.updateMenuOptions(
      30, "assets/burger3.png", "WackCheese",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck]);}
  showBurgerOptions4(): void {
    this.updateMenuOptions(
      45, "assets/burger4.png", "WackChicken",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption,
        this.removePickleOption, this.removeMayoOption]);}
  showBurgerOptions5(): void {
    this.updateMenuOptions(
      40, "assets/burger5.png", "WackCheese Double Patty Menu",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck]);}
  showBurgerOptions6(): void {
    this.updateMenuOptions(
      59, "assets/burger6.png", "WackBacon",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck]);}
  showSidesOptions1(): void {
    this.updateMenuOptions(
      50, "assets/sides1.png", "WackNuggets Large",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showSidesOptions2(): void {
    this.updateMenuOptions(
      20, "assets/sides2.png", "WackNuggets",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showSidesOptions3(): void {
    this.updateMenuOptions(
      20, "assets/sides3.png", "WackChileCheese",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showSidesOptions4(): void {
    this.updateMenuOptions(
      20, "assets/sides4.png", "WackFries Large",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showSidesOptions5(): void {
    this.updateMenuOptions(
      15, "assets/sides5.png", "WackFries",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showSidesOptions6(): void {
    this.updateMenuOptions(
      30, "assets/sides6.png", "WackSticks",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}

  showSodaOptions1(): void {
    if (!this.optionsopen) {
      this.baseprice = 25;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/soda1.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "CocaCola";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.removeMayoOption();
      const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;
      if (sodaRadio1) {
        sodaRadio1.checked = false;}
      const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;
      if (sizeOption) {
        sizeOption.style.width = "100%";
        sizeOption.style.left = "30%";}
      const sizeOptionTitle = document.getElementById("sizeoptiontitle");
      if (sizeOptionTitle) {sizeOptionTitle.innerText = "Soda Size";}
    }
    this.showMenuOptions();
  }
  showSodaOptions2(): void {
    if (!this.optionsopen) {
      this.baseprice = 25;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/soda2.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "Pepsi";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.removeMayoOption();
      const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;
      if (sodaRadio1) {sodaRadio1.checked = false;}
      const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;
      if (sizeOption) {
        sizeOption.style.width = "100%";
        sizeOption.style.left = "30%";
      }
      const sizeOptionTitle = document.getElementById("sizeoptiontitle");
      if (sizeOptionTitle) {sizeOptionTitle.innerText = "Soda Size";}
    }
    this.showMenuOptions();
  }
  showSodaOptions3(): void {
    if (!this.optionsopen) {
      this.baseprice = 25;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/soda3.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "Sprite";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.removeMayoOption();
      const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;
      if (sodaRadio1) {sodaRadio1.checked = false;}
      const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;
      if (sizeOption) {
        sizeOption.style.width = "100%";
        sizeOption.style.left = "30%";
      }
      const sizeOptionTitle = document.getElementById("sizeoptiontitle");
      if (sizeOptionTitle) {sizeOptionTitle.innerText = "Soda Size";}
    }
    this.showMenuOptions();
  }
  showSodaOptions4(): void {
    if (!this.optionsopen) {
      this.baseprice = 25;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/soda4.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "Fanta";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.removeMayoOption();
      const sodaRadio1 = document.getElementById("sodaRadio1") as HTMLInputElement | null;
      if (sodaRadio1) {sodaRadio1.checked = false;}
      const sizeOption = document.getElementById("sizeoption") as HTMLElement | null;
      if (sizeOption) {
        sizeOption.style.width = "100%";
        sizeOption.style.left = "30%";
      }
      const sizeOptionTitle = document.getElementById("sizeoptiontitle");
      if (sizeOptionTitle) {sizeOptionTitle.innerText = "Soda Size";}
    }
    this.showMenuOptions();
  }
  showChickenOptions1(): void {
    this.updateMenuOptions(
      45, "assets/chicken1.png", "WackChicken",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeMayoOption]);}
  showChickenOptions2(): void {
    this.updateMenuOptions(
      30, "assets/chicken2.png", "Chicken Strips",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showChickenOptions3(): void {
    this.updateMenuOptions(
      50, "assets/sides1.png", "WackNuggets Large",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showChickenOptions4(): void {
    this.updateMenuOptions(
      20, "assets/sides2.png", "WackNuggets",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showChickenOptions5(): void {
    this.updateMenuOptions(
      20, "assets/sides3.png", "WackChiliCheese",
      [this.removeSizeOption, this.removeSodaOption, this.uncheck, this.removeCheeseOption, this.removeBaconOption, this.removePickleOption,
        this.removeOnionOption, this.removeTomatoOption, this.removeLettuceOption]);}
  showDessertOptions1(): void {
    this.updateMenuOptions(
      20, "assets/dessert1.png", "Sundeez Caramel",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions2(): void {
    this.updateMenuOptions(
      20, "assets/dessert2.png", "Sundeez Strawberry",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions3(): void {
    this.updateMenuOptions(
      20, "assets/dessert3.png", "Sundeez Chocolate",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions4(): void {
    this.updateMenuOptions(
      25, "assets/dessert4.png", "WackFlurry Chocobits",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions5(): void {
    this.updateMenuOptions(
      25, "assets/dessert5.png", "WackFlurry MnM",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions6(): void {
    this.updateMenuOptions(
      30, "assets/dessert6.png", "Oreo Milkshake",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions7(): void {
    this.updateMenuOptions(
      15, "assets/dessert7.png", "Light Cookie",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions8(): void {
    this.updateMenuOptions(
      15, "assets/dessert8.png", "Dark Cookie",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions9(): void {
    this.updateMenuOptions(
      20, "assets/dessert9.png", "Donut",
      [this.removeAllOptions, this.uncheck]);}
  showDessertOptions10(): void {
    this.updateMenuOptions(
      20, "assets/dessert10.png", "Berliner",
      [this.removeAllOptions, this.uncheck]);}
  showSaladOptions1(): void {
    if (!this.optionsopen) {
      this.baseprice = 40;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/salad1.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "Chicken Strip Salad";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSizeOption();this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.uncheck();
      const mayoOption = document.getElementById("mayooption") as HTMLElement | null;
      if (mayoOption) {
        mayoOption.style.width = "100%";
        mayoOption.style.left = "33%";
      }
      const mayoOptionTitle = document.getElementById("mayooptiontitle");
      if (mayoOptionTitle) {mayoOptionTitle.innerText = "Salad Dressing";}
    }
    this.showMenuOptions();
  }
  showSaladOptions2(): void {
    if (!this.optionsopen) {
      this.baseprice = 30;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/salad2.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "Small Salad";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSizeOption();this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.uncheck();
      const mayoOption = document.getElementById("mayooption") as HTMLElement | null;
      if (mayoOption) {
        mayoOption.style.width = "100%";
        mayoOption.style.left = "33%";
      }
      const mayoOptionTitle = document.getElementById("mayooptiontitle");
      if (mayoOptionTitle) {mayoOptionTitle.innerText = "Salad Dressing";}
    }
    this.showMenuOptions();
  }
  showSaladOptions3(): void {
    if (!this.optionsopen) {
      this.baseprice = 40;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/salad3.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "Feta Salad";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSizeOption();this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.uncheck();
      const mayoOption = document.getElementById("mayooption") as HTMLElement | null;
      if (mayoOption) {
        mayoOption.style.width = "100%";
        mayoOption.style.left = "33%";
      }
      const mayoOptionTitle = document.getElementById("mayooptiontitle");
      if (mayoOptionTitle) {mayoOptionTitle.innerText = "Salad Dressing";}
    }
    this.showMenuOptions();
  }
  showSaladOptions4(): void {
    if (!this.optionsopen) {
      this.baseprice = 49;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/salad4.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "Chicken Strip' Salad Supreme";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSizeOption();this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.uncheck();
      const mayoOption = document.getElementById("mayooption") as HTMLElement | null;
      if (mayoOption) {
        mayoOption.style.width = "100%";
        mayoOption.style.left = "33%";
      }
      const mayoOptionTitle = document.getElementById("mayooptiontitle");
      if (mayoOptionTitle) {mayoOptionTitle.innerText = "Salad Dressing";}
    }
    this.showMenuOptions();
  }
  showSaladOptions5(): void {
    if (!this.optionsopen) {
      this.baseprice = 40;
      const image = document.getElementById("optionImg") as HTMLImageElement;
      if (image) {image.src = "assets/salad5.png";}
      const title = document.getElementById("optionTitle");
      if (title) {title.innerHTML = "WackSalad";}
      const pricetext = document.getElementById("priceTitle");
      if (pricetext) {pricetext.innerHTML = "Price: " + this.baseprice + "DKK";}
      this.removeSizeOption();this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.uncheck();
      const mayoOption = document.getElementById("mayooption") as HTMLElement | null;
      if (mayoOption) {
        mayoOption.style.width = "100%";
        mayoOption.style.left = "33%";
      }
      const mayoOptionTitle = document.getElementById("mayooptiontitle");
      if (mayoOptionTitle) {mayoOptionTitle.innerText = "Salad Dressing";}
    }
    this.showMenuOptions();
  }
  showVeganOptions1(): void {
    this.updateMenuOptions(
      69, "assets/vegan1.png", "WackVegan Deluxe",
      [this.uncheck,this.removeSizeOption, this.removeSodaOption, this.removeCheeseOption, this.removeBaconOption, this.removeMayoOption,
        this.removeKetchupOption]);}
  showVeganOptions2(): void {
    this.updateMenuOptions(
      60, "assets/vegan2.png", "WackVegan",
      [this.uncheck,this.removeSizeOption, this.removeSodaOption, this.removeCheeseOption, this.removeBaconOption, this.removeMayoOption,
        this.removeKetchupOption]);}
  showVeganOptions3(): void {
    this.updateMenuOptions(
      69, "assets/vegan3.png", "WackVegan Supreme",
      [this.uncheck,this.removeSizeOption, this.removeSodaOption, this.removeCheeseOption, this.removeBaconOption, this.removeMayoOption,
        this.removeKetchupOption]);}
  showVeganOptions4(): void {
    if (!this.optionsopen) {
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
      this.removeSizeOption();this.removeSodaOption();this.removeCheeseOption();this.removeBaconOption();this.removePickleOption();
      this.removeOnionOption();this.removeTomatoOption();this.removeLettuceOption();this.removeKetchupOption();this.uncheck();
      const mayoOption = document.getElementById("mayooption") as HTMLElement | null;
      if (mayoOption) {
        mayoOption.style.width = "100%";
        mayoOption.style.left = "33%";
      }
      const mayoOptionTitle = document.getElementById("mayooptiontitle");
      if (mayoOptionTitle) {
        mayoOptionTitle.innerText = "Salad Dressing";
      }
    }
    this.showMenuOptions();
  }
  priceTitle = "";

  updatePrice(): void {
    const printprice =
      this.baseprice + this.newprice + this.cheeseprice + this.baconprice + this.pickleprice + this.onionprice + this.tomatoprice +
      this.lettuceprice + this.ketchupprice + this.mayoprice;
    this.priceTitle = "Price: " + printprice + "DKK";
    const priceTitleElement = document.getElementById('priceTitle');
    if (priceTitleElement) {
      priceTitleElement.innerHTML = this.priceTitle;
    }
  }
  onSizeClicked(size: number): void {
    this.newprice += size; this.updatePrice();}
  onCheeseClicked(cheesePrice: number): void {
    this.cheeseprice += cheesePrice; this.updatePrice();}
  onBaconClicked(baconPrice: number): void {
    this.baconprice += baconPrice; this.updatePrice();}
  onPickleClicked(picklePrice: number): void {
    this.pickleprice += picklePrice; this.updatePrice();}
  onOnionClicked(onionPrice: number): void {
    this.onionprice += onionPrice; this.updatePrice();}
  onTomatoClicked(tomatoPrice: number): void {
    this.tomatoprice += tomatoPrice; this.updatePrice();}
  onLettuceClicked(lettucePrice: number): void {
    this.lettuceprice += lettucePrice; this.updatePrice();}
  onKetchupClicked(ketchupPrice: number): void {
    this.ketchupprice += ketchupPrice; this.updatePrice();}
  onMayoClicked(mayoPrice: number): void {
    this.mayoprice += mayoPrice; this.updatePrice();}
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
      list.innerHTML = "";
      this.data.forEach((item: string) => {
        let li = document.createElement("li") as HTMLLIElement;
        li.innerText = item; li.classList.add("orderParts");
        li.style.cursor = 'pointer'; li.style.textAlign = 'center';
        li.style.borderBottom = 'solid 1px silver'; li.style.paddingBottom = '8px';
        li.style.paddingTop = '8px';
        li.addEventListener('mouseover', () => {
          li.style.color = 'red';});
        li.addEventListener('mouseout', () => {
          // Reset styles on mouseout
          li.style.color = '';});
        li.addEventListener('click', () => this.removeItem(item));
        list.appendChild(li);
      });
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
    this.renderItems();
    this.closeOptions();
  }
  getRadioValue(radioName: string): string {
    const radioButtons = document.getElementsByName(radioName);
    const selectedRadio = Array.from(radioButtons).find((radio) => (radio as HTMLInputElement).checked);
    return selectedRadio ? (selectedRadio as HTMLInputElement).value : "";
  }
  finalFinalString: string = "";

  getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();
    // Add leading zeros if needed
    const formattedDay = (day < 10) ? `0${day}` : day;
    const formattedMonth = (month < 10) ? `0${month}` : month;
    // Format: dd-mm-yyyy
    return `${formattedDay}-${formattedMonth}-${year}`;
  }
  getCurrentTime(): string {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    // Add leading zeros if needed
    const formattedHours = (hours < 10) ? `0${hours}` : hours;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;
    // Format: hh:mm:ss
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  createNewOrderForm = this.fb.group({
    orderIsDone: [false, [Validators.required]],
    orderDate: ['', [Validators.required]],
    orderTime: ['', Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)],
    orderItemArrayId: ['', Validators.minLength(1)],
  })
    openPayScreen() {
      this.finalFinalString = this.data.toString();
        if (this.data.length > 0) {this.submit();
          this.router.navigate(['UserPayScreen']);
        } else {alert("Please add items to your order before proceeding to payment.");}
        return false;
    }
    async submit() {
      try {
        this.createNewOrderForm.setValue({
          orderDate: this.getCurrentDate(),
          orderItemArrayId: this.finalFinalString,
          orderTime: this.getCurrentTime(),
          orderIsDone: false});
        const call = this.http.post<ResponseDto<Order>>(environment.baseUrl + '/api/orders', this.createNewOrderForm.getRawValue())
        const response = await firstValueFrom(call);
        this.state.orders.push(response.responseData!);

        const toast = await this.toastController.create({
          message: 'Order was created!',
          duration: 1233,
          color: "success"
        })
        await toast.present();
      } catch (e) {
        if (e instanceof HttpErrorResponse) {
          const toast = await this.toastController.create({
            message: e.error.messageToClient,
            color: "danger"
          });
          await toast.present();
        }}}
  removeItem(item: string) {
    const indexToRemove = this.data.indexOf(item);
    if (indexToRemove !== -1) {
      this.data.splice(indexToRemove, 1);
      this.setTotal();
      this.renderItems();}}
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly faXmark = faXmark;
}
