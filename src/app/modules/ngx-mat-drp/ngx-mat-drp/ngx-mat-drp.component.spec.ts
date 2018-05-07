import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CalendarOverlayService } from '../services/calendar-overlay.service';
import { RangeStoreService, DATE } from '../services/range-store.service';
import { ConfigStoreService } from '../services/config-store.service';
import { DatePipe } from '@angular/common';
import { NgxMatDrpComponent } from './ngx-mat-drp.component';


class MockOverlayService {
  open(){  }
}

class MockDomSanitizer {
  bypassSecurityTrustResourceUrl() {}
}

describe('NgxMatDrpComponent', () => {
  let component: NgxMatDrpComponent;
  let fixture: ComponentFixture<NgxMatDrpComponent>;
  let sanitizerSpy: jasmine.Spy;
  let iconRegSpy: jasmine.Spy;

  let rangeStoreService : RangeStoreService;
  let configStoreService: ConfigStoreService;

  let today:Date = new Date();
  let fromDate:Date = new Date(today.setDate(today.getDate() - 7));
  let toDate:Date = new Date();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatDrpComponent ],
      providers:[
        {provide: CalendarOverlayService, useClass: MockOverlayService},
        {provide: DATE, useValue: new Date()},
        RangeStoreService,
        ConfigStoreService,
        DatePipe
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    rangeStoreService = TestBed.get(RangeStoreService);
    configStoreService = TestBed.get(ConfigStoreService);
    
    fixture = TestBed.createComponent(NgxMatDrpComponent);
    component = fixture.componentInstance;

    component.options = {
        presets:[],
        format: 'mediumDate',
        range: {fromDate:fromDate, toDate:toDate},
        applyLabel: "Submit"
      };
    
      fixture.detectChanges();
    });
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set options in config', () => {
    expect(configStoreService.ngxDrpOptions).toBeTruthy();
  })

  it('should set current date as per options', () => {
    let updateDateSpy = spyOn(rangeStoreService, "updateRange");
    component.ngOnInit();
    expect(updateDateSpy).toHaveBeenCalledWith(component.options.range.fromDate, component.options.range.toDate);
  })

});
