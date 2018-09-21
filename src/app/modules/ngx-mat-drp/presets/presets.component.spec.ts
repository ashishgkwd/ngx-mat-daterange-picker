import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetsComponent } from './presets.component';

describe('PresetsComponent', () => {
  let component: PresetsComponent;
  let fixture: ComponentFixture<PresetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit preset change', () => {
    const testEvent: any = {name: 'testEvent'};
    component.presetChanged.subscribe(
      val => {
        expect(val).toEqual(testEvent);
      }
    );
    component.setPresetPeriod(testEvent);
  })
});
