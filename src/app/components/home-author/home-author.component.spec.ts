import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthorComponent } from './home-author.component';

describe('HomeComponent', () => {
  let component: HomeAuthorComponent;
  let fixture: ComponentFixture<HomeAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
