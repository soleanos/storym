import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesReaderComponent } from './stories-reader.component';

describe('StoriesReaderComponent', () => {
  let component: StoriesReaderComponent;
  let fixture: ComponentFixture<StoriesReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
