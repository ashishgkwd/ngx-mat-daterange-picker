import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatDrpComponent } from './ngx-mat-drp/ngx-mat-drp.component';
import { PickerOverlayComponent } from './picker-overlay/picker-overlay.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';

import { ConfigStoreService } from './services/config-store.service';
import { CalendarWrapperComponent } from './calendar-wrapper/calendar-wrapper.component';
import { PresetsComponent } from './presets/presets.component';
import { CalendarOverlayService } from './services/calendar-overlay.service';
import { RangeStoreService, DATE } from './services/range-store.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    OverlayModule
  ],
  declarations: [
    NgxMatDrpComponent,
    CalendarWrapperComponent,
    PickerOverlayComponent,
    PresetsComponent
  ],
  providers: [
    CalendarOverlayService,
    RangeStoreService,
    ConfigStoreService,
    {provide: DATE, useValue: new Date()}
  ],
  entryComponents: [PickerOverlayComponent],
  exports: [NgxMatDrpComponent]
})
export class NgxMatDrpModule { }
