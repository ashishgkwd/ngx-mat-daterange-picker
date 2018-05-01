[![CircleCI](https://circleci.com/gh/ashishgkwd/ngx-mat-daterange-picker.svg?style=shield)](https://circleci.com/gh/ashishgkwd/ngx-mat-daterange-picker) [![Maintainability](https://api.codeclimate.com/v1/badges/2b0d09a866f6d2ed139c/maintainability)](https://codeclimate.com/github/ashishgkwd/ngx-mat-daterange-picker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2b0d09a866f6d2ed139c/test_coverage)](https://codeclimate.com/github/ashishgkwd/ngx-mat-daterange-picker/test_coverage) 
![Angular_Version 5](https://img.shields.io/badge/Angular_Version-5-brightgreen.svg)

# NgxMatDaterangePicker

Date range picker component based of [Angular Material](https://material.angular.io/) calendar component and configurable date presets.

Packaged using [ng-packagr](http://spektrakel.de/ng-packagr/)

## Demo
![alt text](https://github.com/ashishgkwd/ngx-mat-daterange-picker/blob/master/src/assets/img/ngx-mat-daterange-picker.gif "ngx-mat-daterange-picker")

## Installation 

```
npm install ngx-mat-daterange-picker --save
```
or
```
yarn add ngx-mat-daterange-picker --save
```

## Peer Dependencies

Please note and install the following peer dependencies necessary
```json
"peerDependencies": {
    "@angular/animations": "^5.2.10",
    "@angular/cdk": "^5.2.5",
    "@angular/material": "^5.2.5"
  }
```

## Example

Import `NgxMatDrpModule` module in your application module.

`app.module.ts`
```typescript
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';

@NgModule({
  ...,
  imports: [..., NgxMatDrpModule, ...],
  ...
})
export class AppModule { }
```

Setup the `NgxDrpOptions` configuration required by the component and the handler function to receive the `Range` object on data selection.

`app.component.ts`
```typescript
import { Component } from '@angular/core';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  range:Range = {fromDate:new Date(), toDate: new Date()};
  options:NgxDrpOptions;
  presets:Array<PresetItem> = [];

  ngOnInit() {
    const today = new Date();
    const fromMin = new Date(today.getFullYear(), today.getMonth()-2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth()+2, 0);

    this.setupPresets();
    this.options = {
                    presets:this.presets,
                    format: 'mediumDate',
                    range: {fromDate:today, toDate: today},
                    applyLabel: "Submit"
                    //cancelLabel: "Cancel",
                    //excludeWeekends:true,
                    //fromMinMax: {fromDate:fromMin, toDate:fromMax},
                    //toMinMax: {fromDate:toMin, toDate:toMax}
                  };
  }
  
  //handler function that receives the updated date range object
  updateRange(range:Range){
    this.range = range;
  }  
  
  //helper function to create initial presets
  setupPresets() {

    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }
    
    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7)
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    
    this.presets =  [
      {presetLabel: "Yesterday", range:{fromDate:yesterday, toDate:today}},
      {presetLabel: "Last 7 Days", range:{fromDate: minus7, toDate:today}},
      {presetLabel: "Last 30 Days", range:{fromDate: minus30, toDate:today}},
      {presetLabel: "This Month", range:{fromDate: currMonthStart, toDate:currMonthEnd}},
      {presetLabel: "Last Month", range:{fromDate: lastMonthStart, toDate:lastMonthEnd}}
    ]
  }
}
```

Pass the reference of the new rang selection handler function to `selectedDateRangeChanged` event emitter and the `NgxDrpOptions` options reference to the `options` input property.

`app.compnent.html`
```html
<ngx-mat-drp (selectedDateRangeChanged)="updateRange($event)" [options]="options"></ngx-mat-drp>
```

## Configuration

```typescript
export interface PresetItem {
    presetLabel: string;
    range:Range;
}

export interface Range {
    fromDate: Date;
    toDate: Date;
}

export interface NgxDrpOptions {
    presets: Array<PresetItem>;
    format: string;
    range: Range;
    excludeWeekends?: boolean;
    locale?:string;
    fromMinMax?:Range;
    toMinMax?:Range;
    applyLabel?:string;
    cancelLabel?:string;
}
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
Run `npm run packagr` to build the library project. The build artifacts will be stored in the `dist/`. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## License

MIT
