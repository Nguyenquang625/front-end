import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserOwnerComponent } from './add-user-owner.component';

describe('AddUserOwnerComponent', () => {
  let component: AddUserOwnerComponent;
  let fixture: ComponentFixture<AddUserOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
