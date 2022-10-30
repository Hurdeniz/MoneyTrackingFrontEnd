import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentListEnterResultComponent } from './shipment-list-enter-result.component';

describe('ShipmentListEnterResultComponent', () => {
  let component: ShipmentListEnterResultComponent;
  let fixture: ComponentFixture<ShipmentListEnterResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentListEnterResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentListEnterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
