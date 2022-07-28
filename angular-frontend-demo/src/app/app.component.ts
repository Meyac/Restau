import {Component, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import { Cards } from 'types';
import { InputFieldComponent } from './input-field/input-field.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { UrlConstants } from './_constants/urlConstanst';
import {RequestServices} from './_service/requestServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Restaurantoooooo';
  location: string = '';
  name: string = '';
  customers: number;
  reqRef = new RequestServices
  specificCardArray: Array<Cards>
  addState: boolean = false;

  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;
  @ViewChild('inputs', {read: ViewContainerRef}) inputsTarget: ViewContainerRef;

  ngOnInit(): void {
    this.searchRestaurant();
  }

  changeName(text: string) {
    this.name = text;
  }

  changeLocation(text: string) {
    this.location = text;
  }

  changeCustomerCount(count: number) {
    this.customers = count;
  }

  changeInputState() {
    this.addState = !this.addState;
  }

  searchRestaurant = async () => {
    let cardArray: Array<Cards> = await this.reqRef.getRestaurantData(UrlConstants.homePath+UrlConstants.pathGetAllRestaus);

    this.target.clear()

    for(let i = 0; i < cardArray.length; i++) {
      this.loadResultCards(cardArray[i], i)
    }
  }

  specificSearch = async () => {
    this.specificCardArray = await this.reqRef.getRestaurantData(UrlConstants.homePath+UrlConstants.pathGetSpecificRestaus, [['name', this.name != '' ? this.name : ''], ['location', this.location], ['page', 0], ['limit', 20]]);

    console.log(this.specificCardArray);

    this.target.clear()

    for(let i = 0; i < this.specificCardArray.length; i++) {
      this.loadResultCards(this.specificCardArray[i], i)
    }

  }

  loadResultCards = async (cards: Cards, index: number) => {
    let newComp = RestaurantCardComponent;
    let comp = this.target.createComponent(newComp);

    comp.instance.name = cards.name
    comp.instance.location = cards.location
    comp.instance.customers = cards.customers
    comp.instance._ref = comp
    comp.instance.index = index
    comp.instance.id = cards.id
  }

  deleteResultCard = async (idx: number) => {
    if(idx !== -1) {
      this.specificCardArray.splice(idx, 1);
    }
  }

  createNewEntry = async() => {
    if(this.name === '' || this.location === '') {
      alert('You need to fill out every input field.');
      return;
    }
    this.reqRef.createEntry(this.name, this.location, this.customers).then(() => {
      this.specificSearch();
    })
  }
}
