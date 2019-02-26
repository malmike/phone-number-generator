import { TestBed } from '@angular/core/testing';

import { PhoneNumberGeneratorService } from './phone-number-generator.service';

describe('NumberGeneratorService', () => {
  let service: PhoneNumberGeneratorService;
  beforeEach( async () => TestBed.configureTestingModule({}));
  beforeEach( () => {
    service = TestBed.get(PhoneNumberGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateRandomNumber', () => {
    const min = 1;
    const max = 999999999;
    let result: string;
    beforeEach(() => {
      result = service.generateRandomNumber(min, max);
    });
    it('should return a intger as a string', () => {
      expect(parseInt(result, 10)).toBeTruthy();
    });
    it('should return a value of 9 or less digits', () => {
      expect(result.length).toBeLessThan(10);
    });
    it('should return value between min and max', () => {
      expect(parseInt(result, 10)).toBeGreaterThanOrEqual(min);
      expect(parseInt(result, 10)).toBeLessThanOrEqual(max);
    });
  });

  describe('createRandomPhoneNumber', () => {
    it('should return 10 digit phone number', () => {
      expect(service.createRandomPhoneNumber('294818391')).toEqual('0294818391');
    });
  });

  describe('createMultiplePhoneNumbers', () => {
    it('should return a set containing 10000 phone numbers', () => {
      const limit = 10000;
      const result = service.createMultiplePhoneNumbers(limit, 1, 999999999);
      expect(result.size).toEqual(limit);
    });
  });
});
