import { TestBed } from '@angular/core/testing';

import { SortPhoneNumbersService } from './sort-phone-numbers.service';

describe('SortPhoneNumbersService', () => {
  let service: SortPhoneNumbersService;
  const mockPhoneNumbers = [
    '0069411057', '0937993678', '0970268444', '0291303547', '0273540969', '0101795804', '0881571619', '0481113136'
  ];
  const mockAscendingSort = [
    '0069411057', '0101795804', '0273540969', '0291303547', '0481113136', '0881571619', '0937993678', '0970268444'
  ];
  const mockDescendingSort = [
    '0970268444', '0937993678', '0881571619', '0481113136', '0291303547', '0273540969', '0101795804', '0069411057'
  ];
  const maximumPhoneNumber = '0970268444';
  const minimumPhoneNumber = '0069411057';

  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(SortPhoneNumbersService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return phone numbers in ascending order', () => {
    const ascendingPhoneNumbers = service.sortAscendingOrder(mockPhoneNumbers);
    expect(ascendingPhoneNumbers).toEqual(mockAscendingSort);
  });

  it('should return phone numbers in descending order', () => {
    const descendingPhoneNumbers = service.sortDescendingOrder(mockPhoneNumbers);
    expect(descendingPhoneNumbers).toEqual(mockDescendingSort);
  });

  it('should return maximum valued phone number', () => {
    const maximumNumber = service.maximumPhoneNumber(mockPhoneNumbers);
    expect(maximumNumber).toEqual(maximumPhoneNumber);
  });

  it('should return minimum valued phone number', () => {
    const minimumNumber = service.minimumPhoneNumber(mockPhoneNumbers);
    expect(minimumNumber).toEqual(minimumPhoneNumber);
  });
});
