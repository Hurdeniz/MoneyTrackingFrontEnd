import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentListViewComponent } from './shipment-list-view.component';

describe('ShipmentListViewComponent', () => {
  let component: ShipmentListViewComponent;
  let fixture: ComponentFixture<ShipmentListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
