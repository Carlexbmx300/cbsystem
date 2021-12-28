import { TestBed } from '@angular/core/testing';

import { LiteralService } from './literal.service';

describe('LiteralService', () => {
  let service: LiteralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiteralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
