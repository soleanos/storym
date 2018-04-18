import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReaderHeaderComponent } from './home-reader-header.component';

describe('HomeAuthorHeaderComponent', () => {
  let component: HomeReaderHeaderComponent;
  let fixture: ComponentFixture<HomeReaderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeReaderHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReaderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
