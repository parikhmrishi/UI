import { TestBed } from '@angular/core/testing';

import { HomequizsService } from './homequizs.service';

describe('HomequizsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomequizsService = TestBed.get(HomequizsService);
    expect(service).toBeTruthy();
  });
});
