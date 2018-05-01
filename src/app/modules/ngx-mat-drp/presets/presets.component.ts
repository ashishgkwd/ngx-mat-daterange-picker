import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { PresetItem } from '../model/model';

@Component({
  selector: 'mat-drp-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  //encapsulation: ViewEncapsulation.None
})
export class PresetsComponent implements OnInit {
  
  @Input() presets:Array<PresetItem>;
  @Output() readonly presetChanged:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  setPresetPeriod(event){
    this.presetChanged.emit(event);
  }

}
