import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReOpenCaseComponent } from './button-re-open-case.component';

describe('ButtonReOpenCaseComponent', () => {
  let component: ButtonReOpenCaseComponent;
  let fixture: ComponentFixture<ButtonReOpenCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonReOpenCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonReOpenCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
