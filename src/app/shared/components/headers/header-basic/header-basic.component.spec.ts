import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBasicComponent } from './header-basic.component';

describe('HeaderBasicComponent', () => {
  let component: HeaderBasicComponent;
  let fixture: ComponentFixture<HeaderBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
