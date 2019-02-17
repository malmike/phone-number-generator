import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberGeneratorService {

  constructor() { }

  /**
   * @param min minimum expected return value
   * @param max maximum expected return value
   * @returns a string containing a random number between min and max
   */
  generateRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  /**
   * @param value string of numbers of 9 or less digits
   * @returns 10 digit number that start with zeros
   */
  createRandomPhoneNumber(value: string) {
    return '0'.repeat(10 - value.length).concat(value);
  }

  /**
   * @param limit the number of phone numbers we want generated
   * @param min the minimum number the phone number should have
   * @param max the maximum number the phone number should have
   * @returns a set containing unique phone numbers
   */
  createMultiplePhoneNumbers(limit: number, min: number, max: number) {
    const phoneNumbers = new Set([]);
    while (phoneNumbers.size < limit) {
      phoneNumbers.add(this.createRandomPhoneNumber(this.generateRandomNumber(min, max)));
    }
    return phoneNumbers;
  }

}
