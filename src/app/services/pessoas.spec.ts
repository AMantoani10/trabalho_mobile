import { TestBed } from '@angular/core/testing';

import { Pessoas } from './pessoas';

describe('Pessoas', () => {
  let service: Pessoas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pessoas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
