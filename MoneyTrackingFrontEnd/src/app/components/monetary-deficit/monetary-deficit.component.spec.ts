import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryDeficitComponent } from './monetary-deficit.component';

describe('MonetaryDeficitComponent', () => {
  let component: MonetaryDeficitComponent;
  let fixture: ComponentFixture<MonetaryDeficitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonetaryDeficitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonetaryDeficitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
