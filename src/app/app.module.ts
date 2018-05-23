import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxMatDrpModule } from './modules/ngx-mat-drp/ngx-mat-drp.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMatDrpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
