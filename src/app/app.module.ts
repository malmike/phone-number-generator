import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { PhoneNumberGeneratorComponent } from './phone-number-generator/phone-number-generator.component';
import { AppRoutingModule } from './app-routing.module';
import { PhoneNumberGeneratorService } from './services/phone-number-generator.service';
import { SortPhoneNumbersService } from './services/sort-phone-numbers.service';

@NgModule({
  declarations: [
    AppComponent,
    PhoneNumberGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: ''},
    PhoneNumberGeneratorService,
    SortPhoneNumbersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
