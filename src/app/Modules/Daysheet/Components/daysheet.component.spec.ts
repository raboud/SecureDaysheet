import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DaysheetComponent } from './daysheet.component';

describe('DaysheetComponent', () => {
  let component: DaysheetComponent;
  let fixture: ComponentFixture<DaysheetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
