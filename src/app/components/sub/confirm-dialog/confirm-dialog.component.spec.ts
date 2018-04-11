import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmDialogComponent } from './confirm-dialog.component';

describe('ComfirmDialogComponent', () => {
  let component: ComfirmDialogComponent;
  let fixture: ComponentFixture<ComfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
