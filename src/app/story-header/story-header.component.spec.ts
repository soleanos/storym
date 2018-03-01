import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryHeaderComponent } from './story-header.component';

describe('StoryHeaderComponent', () => {
  let component: StoryHeaderComponent;
  let fixture: ComponentFixture<StoryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
