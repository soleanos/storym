import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesAuthorComponent } from './stories-author.component';

describe('StoriesAuthorComponent', () => {
  let component: StoriesAuthorComponent;
  let fixture: ComponentFixture<StoriesAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
