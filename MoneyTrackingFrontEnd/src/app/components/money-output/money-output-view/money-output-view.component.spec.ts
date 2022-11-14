import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyOutputViewComponent } from './money-output-view.component';

describe('MoneyOutputViewComponent', () => {
  let component: MoneyOutputViewComponent;
  let fixture: ComponentFixture<MoneyOutputViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyOutputViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyOutputViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
