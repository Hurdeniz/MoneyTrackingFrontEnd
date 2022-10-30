import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentListDeleteComponent } from './shipment-list-delete.component';

describe('ShipmentListDeleteComponent', () => {
  let component: ShipmentListDeleteComponent;
  let fixture: ComponentFixture<ShipmentListDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentListDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentListDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
