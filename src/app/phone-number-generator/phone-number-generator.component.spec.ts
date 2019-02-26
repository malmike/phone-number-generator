import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberGeneratorComponent } from './phone-number-generator.component';
import { PhoneNumberGeneratorService } from '../services/phone-number-generator.service';
import { SortPhoneNumbersService } from '../services/sort-phone-numbers.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PhoneNumberGenerator.Component', () => {
  let component: PhoneNumberGeneratorComponent;
  let fixture: ComponentFixture<PhoneNumberGeneratorComponent>;
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

  class MockPhoneNumberGeneratorService {
    createMultiplePhoneNumbers() {
      return mockPhoneNumbers;
    }
  }

  class MockSortPhoneNumbersService {
    sortAscendingOrder() { return mockAscendingSort; }
    sortDescendingOrder() { return mockDescendingSort; }
    maximumPhoneNumber() { return maximumPhoneNumber; }
    minimumPhoneNumber() { return minimumPhoneNumber; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNumberGeneratorComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
      {
        provide: PhoneNumberGeneratorService,
        useClass: MockPhoneNumberGeneratorService
      }, {
        provide: SortPhoneNumbersService,
        useClass: MockSortPhoneNumbersService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createPhoneNumbers', () => {
    beforeEach(() => {
      component.createPhoneNumbers();
    });
    it('should create phone numbers', () => {
      expect(component.phoneNumbers).toEqual(mockPhoneNumbers);
    });
    it('should have saved phone numbers to local storage', () => {
      const item = localStorage.getItem('PhoneNumbers');
      expect(item).toEqual(JSON.stringify(mockPhoneNumbers));
    });
  });

  describe('generate_phone_numbers button', () => {
    it('when flag `active` is false, should generate_phone_numbers button should be inactive', () => {
      component.active = false;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.generate_phone_numbers'),
      ).toBeFalsy();
    });

    it('when flag `active` is true, should generate_phone_numbers button should be active', () => {
      component.active = true;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.generate_phone_numbers'),
      ).toBeTruthy();
    });

    it('should create phone numbers when generate_phone_numbers is clicked', () => {
      fixture.debugElement.query(By.css('.generate_phone_numbers')).nativeElement.click();
      expect(component.phoneNumbers).toEqual(mockPhoneNumbers);
    });
  });

  describe('modifications div', () => {
    it('should not contain the div modifications, when phone numbers is not defined', () => {
      component.phoneNumbers = undefined;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.modifications'),
      ).toBeFalsy();
    });
  });

  describe('modifications div', () => {
    it('should not contain the div modifications, when phone numbers is not defined', () => {
      component.phoneNumbers = undefined;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.modifications'),
      ).toBeFalsy();
    });

    it('should contain the div modifications, when phone numbers is defined', () => {
      component.phoneNumbers = [];
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.modifications'),
      ).toBeTruthy();
    });
  });

  describe('phone-numbers div', () => {
    it('should not contain the div phone-numbers, when phone numbers is not defined', () => {
      component.phoneNumbers = undefined;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.phone-numbers'),
      ).toBeFalsy();
    });

    it('should  contain the div phone-numbers, when phone numbers is defined', () => {
      component.phoneNumbers = [];
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.phone-numbers'),
      ).toBeTruthy();
    });
  });

  describe('button_changes buttons', () => {
    beforeEach(() => {
      component.createPhoneNumbers();
      fixture.detectChanges();
    });
    it('should sort phone numbers in ascending order when ascending_sort button clicked', () => {
      fixture.debugElement.query(By.css('.ascending_sort')).nativeElement.click();
      expect(component.phoneNumbers).toEqual(mockAscendingSort);
    });

    it('should sort phone numbers in descending order when descending_sort button clicked', () => {
      fixture.debugElement.query(By.css('.descending_sort')).nativeElement.click();
      expect(component.phoneNumbers).toEqual(mockDescendingSort);
    });

    it('should reset phone numbers to original values', () => {
      component.phoneNumbers = mockAscendingSort;
      fixture.detectChanges();
      fixture.debugElement.query(By.css('.reset')).nativeElement.click();
      expect(component.phoneNumbers).toEqual(mockPhoneNumbers);
    });

    describe('maximum button', () => {
      beforeEach(() => {
        fixture.debugElement.query(By.css('.maximum')).nativeElement.click();
        fixture.detectChanges();
      });

      it('should return maximum phone number', () => {
        expect(component.maximumPhoneNumber).toEqual(maximumPhoneNumber);
      });

      it('should show max phone number in paragraph tag', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.max-phone-number').textContent).toContain(maximumPhoneNumber);
      });

      it('should set getMax as true', () => {
        expect(component.getMax).toBeTruthy();
      });

      it('should set getMin as false', () => {
        expect(component.getMin).toBeFalsy();
      });
    });

    describe('minimum button', () => {
      beforeEach(() => {
        fixture.debugElement.query(By.css('.minimum')).nativeElement.click();
        fixture.detectChanges();
      });

      it('should return minimum phone number', () => {
        expect(component.minimumPhoneNumber).toEqual(minimumPhoneNumber);
      });

      it('should show min phone number in paragraph tag', () => {
        expect(fixture.debugElement.nativeElement.querySelector('.min-phone-number').textContent).toContain(minimumPhoneNumber);
      });

      it('should set getMin as true', () => {
        expect(component.getMin).toBeTruthy();
      });

      it('should set getMax as false', () => {
        expect(component.getMax).toBeFalsy();
      });
    });
  });
});
