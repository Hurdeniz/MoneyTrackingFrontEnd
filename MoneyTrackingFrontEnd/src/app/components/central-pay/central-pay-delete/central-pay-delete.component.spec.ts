import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralPayDeleteComponent } from './central-pay-delete.component';

describe('CentralPayDeleteComponent', () => {
  let component: CentralPayDeleteComponent;
  let fixture: ComponentFixture<CentralPayDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralPayDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralPayDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
