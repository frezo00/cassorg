import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityParticipantsFormComponent } from './activity-participants-form.component';

describe('ActivityParticipantsFormComponent', () => {
  let component: ActivityParticipantsFormComponent;
  let fixture: ComponentFixture<ActivityParticipantsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityParticipantsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityParticipantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
