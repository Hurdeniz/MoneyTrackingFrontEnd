import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureMoneyViewComponent } from './future-money-view.component';

describe('FutureMoneyViewComponent', () => {
  let component: FutureMoneyViewComponent;
  let fixture: ComponentFixture<FutureMoneyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureMoneyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureMoneyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
