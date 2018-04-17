import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthorHeaderComponent } from './home-author-header.component';

describe('HomeAuthorHeaderComponent', () => {
  let component: HomeAuthorHeaderComponent;
  let fixture: ComponentFixture<HomeAuthorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAuthorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAuthorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
