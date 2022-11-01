import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchListDeleteComponent } from './research-list-delete.component';

describe('ResearchListDeleteComponent', () => {
  let component: ResearchListDeleteComponent;
  let fixture: ComponentFixture<ResearchListDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchListDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchListDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
