import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTestComponent } from './story-test.component';

describe('StoryTestComponent', () => {
  let component: StoryTestComponent;
  let fixture: ComponentFixture<StoryTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
