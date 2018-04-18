import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReaderComponent } from './home-reader.component';

describe('HomeComponent', () => {
  let component: HomeReaderComponent;
  let fixture: ComponentFixture<HomeReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
