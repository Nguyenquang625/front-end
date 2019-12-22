import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLeaderComponent } from './chat-leader.component';

describe('ChatLeaderComponent', () => {
  let component: ChatLeaderComponent;
  let fixture: ComponentFixture<ChatLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
