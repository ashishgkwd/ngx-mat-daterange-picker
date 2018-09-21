import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CalendarOverlayService } from '../services/calendar-overlay.service';
import { RangeStoreService, DATE } from '../services/range-store.service';
import { ConfigStoreService } from '../services/config-store.service';
import { DatePipe } from '@angular/common';
import { NgxMatDrpComponent } from './ngx-mat-drp.component';

class MockOverlayService {
  open() {}
}

class MockDomSanitizer {
  bypassSecurityTrustResourceUrl() {}
}

describe('NgxMatDrpComponent', () => {
  let component: NgxMatDrpComponent;
  let fixture: ComponentFixture<NgxMatDrpComponent>;

  const today: Date = new Date();
  const fromDate: Date = new Date(today.setDate(today.getDate() - 7));
  const toDate: Date = new Date();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxMatDrpComponent],
      providers: [
        { provide: DATE, useValue: new Date() },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(NgxMatDrpComponent, {
      set: {
        providers: [
          { provide: CalendarOverlayService, useClass: MockOverlayService },
          RangeStoreService,
          ConfigStoreService,
          DatePipe,
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(NgxMatDrpComponent);
    component = fixture.componentInstance;

    component.options = {
      presets: [],
      format: 'mediumDate',
      range: { fromDate: fromDate, toDate: toDate },
      applyLabel: 'Submit'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set options in config', () => {
    expect(component.configStoreService.ngxDrpOptions).toBeTruthy();
  });

  it('should set current date as per options', () => {
    const updateDateSpy = spyOn(component.rangeStoreService, 'updateRange');
    component.ngOnInit();
    expect(updateDateSpy).toHaveBeenCalledWith(
      component.options.range.fromDate,
      component.options.range.toDate
    );
  });

  it('should reset dates as per input', () => {
    // tslint:disable no-shadowed-variable
    const today = new Date();
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const resetRange = { fromDate: currMonthStart, toDate: currMonthEnd };
    component.resetDates(resetRange);
    component.selectedDateRangeChanged.subscribe(
      range => {
        expect(range.fromDate).toEqual(resetRange.fromDate);
        expect(range.toDate).toEqual(resetRange.toDate);
      }
    );
  });
});
