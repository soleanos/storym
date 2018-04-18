import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryAuthorComponent } from './story-author.component';

describe('StoryAuthorComponent', () => {
  let component: StoryAuthorComponent;
  let fixture: ComponentFixture<StoryAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
