import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhoneNumberGeneratorService } from '../services/phone-number-generator.service';
import { SortPhoneNumbersService } from '../services/sort-phone-numbers.service';

@Component({
  selector: 'app-phone-number-generator',
  templateUrl: './phone-number-generator.component.html',
  styleUrls: ['./phone-number-generator.component.css']
})

export class PhoneNumberGeneratorComponent implements OnInit {
  createPhoneNumbersForm: FormGroup;
  active = true;
  min = 1;
  max = 999999999;
  phoneNumbers: Array<string>;
  getMax = false;
  getMin = false;
  maximumPhoneNumber: string;
  minimumPhoneNumber: string;
  ascendingPhoneNumbers: Array<string>;
  descendingPhoneNumbers: Array<string>;

  formErrors = {
    'number_of_phone_numbers': ''
  };

  validationMessages = {
    'number_of_phone_numbers': {
      'required': 'Specify number of phone numbers to be generated',
      'max': 'Phone Numbers generated should not exceed 10000',
      'min': 'Phone Numbers generated should not be less than 1'
    }
  };

  constructor(
    private fb: FormBuilder,
    private phoneNumberGeneratorService: PhoneNumberGeneratorService,
    private sortPhoneNumbersService: SortPhoneNumbersService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.createPhoneNumbersForm = this.fb.group({
      number_of_phone_numbers: [10000, [
        Validators.required,
        Validators.max(10000),
        Validators.min(1),
      ]]
    });

    this.createPhoneNumbersForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.createPhoneNumbersForm) { return; }
    const form = this.createPhoneNumbersForm;

    Object.keys(this.formErrors).map(key => {
      this.formErrors[key] = '';
      const control = form.get(key);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[key];
        Object.keys(control.errors).map(id => {
          this.formErrors[key] = messages[id];
        });
      }
    });
  }



  createPhoneNumbers() {
    this.getMax = false;
    this.getMin = false;
    this.ascendingPhoneNumbers = undefined;
    this.descendingPhoneNumbers = undefined;
    this.maximumPhoneNumber = undefined;
    this.minimumPhoneNumber = undefined;
    const data: any = this.createPhoneNumbersForm.value;
    const createdPhoneNumbers: Set<string> = this.phoneNumberGeneratorService.createMultiplePhoneNumbers(
      data.number_of_phone_numbers, this.min, this.max
    );
    this.phoneNumbers = Array.from(createdPhoneNumbers.values());
    localStorage.setItem('PhoneNumbers', JSON.stringify(this.phoneNumbers));
  }

  getAscendingPhoneNumbers() {
    this.getMax = false;
    this.getMin = false;
    if (!this.ascendingPhoneNumbers) {
      this.ascendingPhoneNumbers = this.sortPhoneNumbersService.sortAscendingOrder(this.phoneNumbers);
    }
    // debugger;
    this.phoneNumbers = [...this.ascendingPhoneNumbers];
  }

  getPhoneNumbersFromLocalStorage() {
    this.getMax = false;
    this.getMin = false;
    const response = localStorage.getItem('PhoneNumbers');
    if (response) {this.phoneNumbers = JSON.parse(response); }
  }

  getDescendingPhoneNumbers() {
    this.getMax = false;
    this.getMin = false;
    if (!this.descendingPhoneNumbers) {
      this.descendingPhoneNumbers = this.sortPhoneNumbersService.sortDescendingOrder(this.phoneNumbers);
    }
    this.phoneNumbers = [...this.descendingPhoneNumbers];
  }

  getMaximumPhoneNumber() {
    this.getMax = true;
    this.getMin = false;
    this.maximumPhoneNumber = this.sortPhoneNumbersService.maximumPhoneNumber(this.phoneNumbers);
  }

  getMinimumPhoneNumber() {
    this.getMax = false;
    this.getMin = true;
    this.minimumPhoneNumber = this.sortPhoneNumbersService.minimumPhoneNumber(this.phoneNumbers);
  }

  get showPhoneNumbers() {
    return !this.getMax && !this.getMin;
  }

}
