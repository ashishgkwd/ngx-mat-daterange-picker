import { Component } from '@angular/core';
import { Range, NgxDrpOptions, PresetItem } from './modules/ngx-mat-drp/model/model';
@Component({
  selector: 'ngx-mat-drp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  range:Range = {fromDate:new Date(), toDate: new Date()};
  options:NgxDrpOptions;
  presets:Array<PresetItem> = [];

  ngOnInit() {
    let today = new Date();
    let fromMin = new Date(today.getFullYear(), today.getMonth()-2, 1);
    let fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
    let toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
    let toMax = new Date(today.getFullYear(), today.getMonth()+2, 0);

    this.setupPresets();
    this.options = {
                    presets:this.presets,
                    format: 'mediumDate',
                    range: {fromDate:today, toDate: today},
                    applyLabel: "Submit"
                    //excludeWeekends:true,
                    //fromMinMax: {fromDate:fromMin, toDate:fromMax},
                    //toMinMax: {fromDate:toMin, toDate:toMax},
                  };
  }

  updateRange(range:Range){
    this.range = range;
  }  

  setupPresets() {

    let backDate = (numOfDays) => {
      let today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }
    
    let today = new Date();
    let yesterday = backDate(1);
    let minus7 = backDate(7)
    let minus30 = backDate(30);
    let currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    let currMonthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0);
    let lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
    let lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    
    this.presets =  [
      {presetLabel: "Yesterday", range:{fromDate:yesterday, toDate:today}},
      {presetLabel: "Last 7 Days", range:{fromDate: minus7, toDate:today}},
      {presetLabel: "Last 30 Days", range:{fromDate: minus30, toDate:today}},
      {presetLabel: "This Month", range:{fromDate: currMonthStart, toDate:currMonthEnd}},
      {presetLabel: "Last Month", range:{fromDate: lastMonthStart, toDate:lastMonthEnd}}
    ]
  }
}
