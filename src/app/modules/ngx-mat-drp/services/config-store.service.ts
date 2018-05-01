import { Injectable } from '@angular/core';
import { CalendarDialogConfig, NgxDrpOptions } from '../model/model';

@Injectable()
export class ConfigStoreService {

  private _calendarDialogConfig:CalendarDialogConfig;
  private _ngxDrpOptions:NgxDrpOptions;
  private defaultOptions = {
    excludeWeekends:false,
    locale: 'en-US',
    fromMinMax:{fromDate:null, toDate:null},
    toMinMax:{fromDate:null, toDate:null}
  };

  constructor() { }

  get calendarDialogConfig():CalendarDialogConfig {
    return this._calendarDialogConfig;
  }

  get ngxDrpOptions():NgxDrpOptions {
    return this._ngxDrpOptions;
  }

  set calendarDialogConfig(config:CalendarDialogConfig) {
    this._calendarDialogConfig = config;
  }

  set ngxDrpOptions(options:NgxDrpOptions) {
    this._ngxDrpOptions = {...this.defaultOptions, ...options};
  }


}
