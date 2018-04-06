import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryManagementComponent } from './story-management.component';

describe('StoryManagementComponent', () => {
  let component: StoryManagementComponent;
  let fixture: ComponentFixture<StoryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
