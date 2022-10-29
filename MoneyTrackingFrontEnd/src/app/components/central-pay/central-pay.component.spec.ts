import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralPayComponent } from './central-pay.component';

describe('CentralPayComponent', () => {
  let component: CentralPayComponent;
  let fixture: ComponentFixture<CentralPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
