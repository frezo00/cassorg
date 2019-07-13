import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderExpandedComponent } from './header-expanded.component';

describe('HeaderExpandedComponent', () => {
  let component: HeaderExpandedComponent;
  let fixture: ComponentFixture<HeaderExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
