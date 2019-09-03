import {
  Component,
  ViewChild,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { ConfigStoreService } from '../services/config-store.service';

@Component({
  selector: 'calendar-wrapper',
  templateUrl: './calendar-wrapper.component.html',
  styleUrls: ['./calendar-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWrapperComponent implements OnChanges {
  @ViewChild(MatCalendar)
  matCalendar: MatCalendar<Date>;

  @Output()
  readonly selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  dateFormat: string;
  @Input() selectedDate: Date;
  @Input() prefixLabel: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  weekendFilter = (d: Date) => true;

  constructor(private configStore: ConfigStoreService) {
    this.dateFormat = configStore.ngxDrpOptions.format;
    if (configStore.ngxDrpOptions.excludeWeekends) {
      this.weekendFilter = (d: Date): boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Necessary to force view refresh
    if (changes.selectedDate.currentValue) {
      this.matCalendar.activeDate = changes.selectedDate.currentValue;
    }
    this.matCalendar.selected = changes.selectedDate.currentValue;
  }

  onSelectedChange(date) {
    this.selectedDateChange.emit(date);
  }

  onYearSelected(e) {}

  onUserSelection(e) {}
}
