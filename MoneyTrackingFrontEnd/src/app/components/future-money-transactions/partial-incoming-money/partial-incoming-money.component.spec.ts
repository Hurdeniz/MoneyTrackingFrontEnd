import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialIncomingMoneyComponent } from './partial-incoming-money.component';

describe('PartialIncomingMoneyComponent', () => {
  let component: PartialIncomingMoneyComponent;
  let fixture: ComponentFixture<PartialIncomingMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialIncomingMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialIncomingMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
