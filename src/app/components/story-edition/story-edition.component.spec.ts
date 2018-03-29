import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryEditionComponent } from './story-edition.component';

describe('StoryEditionComponent', () => {
  let component: StoryEditionComponent;
  let fixture: ComponentFixture<StoryEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
