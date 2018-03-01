import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesHeaderComponent } from './stories-header.component';

describe('StoriesHeaderComponent', () => {
  let component: StoriesHeaderComponent;
  let fixture: ComponentFixture<StoriesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
