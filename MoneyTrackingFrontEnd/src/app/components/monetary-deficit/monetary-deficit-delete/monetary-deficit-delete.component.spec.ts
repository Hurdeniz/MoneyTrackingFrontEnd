import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryDeficitDeleteComponent } from './monetary-deficit-delete.component';

describe('MonetaryDeficitDeleteComponent', () => {
  let component: MonetaryDeficitDeleteComponent;
  let fixture: ComponentFixture<MonetaryDeficitDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonetaryDeficitDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonetaryDeficitDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
