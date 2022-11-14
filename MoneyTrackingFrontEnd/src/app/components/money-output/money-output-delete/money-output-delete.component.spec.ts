import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyOutputDeleteComponent } from './money-output-delete.component';

describe('MoneyOutputDeleteComponent', () => {
  let component: MoneyOutputDeleteComponent;
  let fixture: ComponentFixture<MoneyOutputDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyOutputDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyOutputDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
