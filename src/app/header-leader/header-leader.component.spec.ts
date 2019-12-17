import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLeaderComponent } from './header-leader.component';

describe('HeaderLeaderComponent', () => {
  let component: HeaderLeaderComponent;
  let fixture: ComponentFixture<HeaderLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
