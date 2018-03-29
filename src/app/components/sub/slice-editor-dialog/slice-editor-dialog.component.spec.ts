import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceEditorDialogComponent } from './slice-editor-dialog.component';

describe('SliceEditorComponent', () => {
  let component: SliceEditorDialogComponent;
  let fixture: ComponentFixture<SliceEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliceEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliceEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
