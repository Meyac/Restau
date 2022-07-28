import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestServices } from '../_service/requestServices';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent {
  @Output() onDelete = new EventEmitter<number>();  
  @Input() name: string;
  @Input() location: string;
  @Input() index: number;
  @Input() customers: number;
  @Input() _ref: ComponentRef<RestaurantCardComponent>;
  @Input() toggleState: string;
  @Input() id: number;
  newLocation: string = '';
  newName: string = '';
  newCustomerCount: number = -1;
  editEnabled: boolean = false;
  visible: boolean = false;

  reqRef = new RequestServices;
  ordLoc = "https://maps.google.com/maps?q=McDonald's%20Kaiserstra%C3%9Fe%20150,%2076133%20Karlsruhe&t=&z=15&ie=UTF8&iwloc=&output=embed"


  constructor() { }

  ngOnInit(): void {
  }

  changeName(text: string) {
    this.newName = text;
    // alert(text);
  }
  
  changeLocation(text: string) {
    // alert(text);
    this.newLocation = text;
  }
  
  changeCustomerCount(count: number) {
    this.newCustomerCount = count;
    // alert(count);
  }


  modifyRestaurantEntry = () => {
    this.reqRef.modifyEntry(this.id, 'BurgerBoy', '', '').then((res) => {
      // alert(JSON.stringify(res));
    })
  };

  deleteRestaurantEntry = async (restauName: string, loc: string, custs?: number) => {
    const res = await this.reqRef.deleteRestaurantEntery(restauName, loc);
    // alert(`Deleting: ${restauName} at ${loc}! -- status: ${JSON.stringify(res)}`);
    this.deleteCard(this.index);
  }

  deleteCard = (idx: number) => {
    this._ref.destroy();
    this.onDelete.emit(idx);
  }

  editRestauEntry = async () => {
    const res = await this.reqRef.modifyEntry(this.id, this.newName, this.newLocation, this.newCustomerCount == -1 ? JSON.stringify(this.customers) : JSON.stringify(this.newCustomerCount))
    // alert(JSON.stringify(res));
    this.disableEditing()
    this.newName = ''
    this.newLocation = ''
    this.newCustomerCount = 0
  }

  enableEditing = () => {
    this.editEnabled = true;
    // alert(this.editEnabled)
  }

  disableEditing = () => {
    this.visible = true;
    this.editEnabled = false;

    setTimeout(() => this.visible = false, 1000);
  }

}
