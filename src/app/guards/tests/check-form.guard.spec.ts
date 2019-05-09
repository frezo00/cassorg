import { TestBed, async, inject } from '@angular/core/testing';

import { CheckFormGuard } from '../check-form.guard';

describe('CheckFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFormGuard]
    });
  });

  it('should ...', inject([CheckFormGuard], (guard: CheckFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
