import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralPayViewComponent } from './central-pay-view.component';

describe('CentralPayViewComponent', () => {
  let component: CentralPayViewComponent;
  let fixture: ComponentFixture<CentralPayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralPayViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralPayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
