import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceCreationDialogComponent } from './slice-creation-dialog.component';

describe('SliceCreationDialogComponent', () => {
  let component: SliceCreationDialogComponent;
  let fixture: ComponentFixture<SliceCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliceCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliceCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
