import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryEditionHeaderComponent } from './story-edition-header.component';

describe('StoryEditionHeaderComponent', () => {
  let component: StoryEditionHeaderComponent;
  let fixture: ComponentFixture<StoryEditionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryEditionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryEditionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
