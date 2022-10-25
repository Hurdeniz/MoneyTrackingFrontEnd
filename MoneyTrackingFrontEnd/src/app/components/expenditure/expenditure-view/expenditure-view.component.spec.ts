import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureViewComponent } from './expenditure-view.component';

describe('ExpenditureViewComponent', () => {
  let component: ExpenditureViewComponent;
  let fixture: ComponentFixture<ExpenditureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenditureViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenditureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
