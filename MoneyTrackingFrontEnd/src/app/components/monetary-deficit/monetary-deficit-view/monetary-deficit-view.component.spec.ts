import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryDeficitViewComponent } from './monetary-deficit-view.component';

describe('MonetaryDeficitViewComponent', () => {
  let component: MonetaryDeficitViewComponent;
  let fixture: ComponentFixture<MonetaryDeficitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonetaryDeficitViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonetaryDeficitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
