import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchListViewComponent } from './research-list-view.component';

describe('ResearchListViewComponent', () => {
  let component: ResearchListViewComponent;
  let fixture: ComponentFixture<ResearchListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
