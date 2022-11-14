import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyOutputComponent } from './money-output.component';

describe('MoneyOutputComponent', () => {
  let component: MoneyOutputComponent;
  let fixture: ComponentFixture<MoneyOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
