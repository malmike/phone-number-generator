import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortPhoneNumbersService {

  constructor() { }

  /**
   * @param phoneNumbers Array containing phone numbers in string format
   * @returns array of sorted phone numbers in ascending order
   */
  sortAscendingOrder(phoneNumbers: Array<string>): Array<string> {
    return phoneNumbers.sort();
  }

  /**
   * @param phoneNumbers Array containing phone numbers in string format
   * @returns array of sorted phone numbers in descending order
   */
  sortDescendingOrder(phoneNumbers: Array<string>): Array<string> {
    return phoneNumbers.sort().reverse();
  }

  /**
   * @param phoneNumbers Array containing phone numbers in string format
   * @returns string of maximum phone number
   */
  maximumPhoneNumber(phoneNumbers: Array<string>): string {
    let maximumNumber = phoneNumbers[0];
    phoneNumbers.forEach(value => {
      maximumNumber = value > maximumNumber ? value : maximumNumber;
    });
    return maximumNumber;
  }

  /**
   * @param phoneNumbers Array containing phone numbers in string format
   * @returns string of minimum phone number
   */
  minimumPhoneNumber(phoneNumbers: Array<string>): string {
    let minimumNumber = phoneNumbers[0];
    phoneNumbers.forEach(value => {
      minimumNumber = value < minimumNumber ? value : minimumNumber;
    });
    return minimumNumber;
  }
}
