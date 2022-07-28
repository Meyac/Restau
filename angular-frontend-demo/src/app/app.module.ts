import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ButtonComponent } from './button/button.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { ModeSelectorComponent } from './mode-selector/mode-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    ButtonComponent,
    RestaurantCardComponent,
    ModeSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
