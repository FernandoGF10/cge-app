import { TestBed } from '@angular/core/testing';

import { Medidores } from './medidores';

describe('Medidores', () => {
  let service: Medidores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Medidores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
