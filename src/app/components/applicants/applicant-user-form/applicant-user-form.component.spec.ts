import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantUserFormComponent } from './applicant-user-form.component';

describe('ApplicantUserFormComponent', () => {
  let component: ApplicantUserFormComponent;
  let fixture: ComponentFixture<ApplicantUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
