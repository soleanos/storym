import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCreationDialogComponent } from './story-creation-dialog.component';

describe('StoryCreationDialogComponent', () => {
  let component: StoryCreationDialogComponent;
  let fixture: ComponentFixture<StoryCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
