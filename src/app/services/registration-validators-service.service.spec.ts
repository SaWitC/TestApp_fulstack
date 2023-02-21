import { TestBed } from '@angular/core/testing';

import { RegistrationValidatorsServiceService } from './registration-validators-service.service';

describe('RegistrationValidatorsServiceService', () => {
  let service: RegistrationValidatorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationValidatorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
