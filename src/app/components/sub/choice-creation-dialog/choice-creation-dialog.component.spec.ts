import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceCreationDialogComponent } from './choice-creation-dialog.component';

describe('ChoiceCreationDialogComponent', () => {
  let component: ChoiceCreationDialogComponent;
  let fixture: ComponentFixture<ChoiceCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
