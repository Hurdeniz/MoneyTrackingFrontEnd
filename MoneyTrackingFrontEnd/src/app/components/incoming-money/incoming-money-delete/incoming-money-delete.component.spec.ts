import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingMoneyDeleteComponent } from './incoming-money-delete.component';

describe('IncomingMoneyDeleteComponent', () => {
  let component: IncomingMoneyDeleteComponent;
  let fixture: ComponentFixture<IncomingMoneyDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingMoneyDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingMoneyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
