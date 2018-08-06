import { SpecificValidator } from '../components.types';
import { Validators, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-opening-hours',
  template: require('./opening-hours.component.html')
})
export class OpeningHoursComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() placeholderOpeningHour: string = '08:00';
  @Input() placeholderClosingHour: string = '20:00';
  @Input() isRequired: boolean = false;

  ngOnInit(): void {
    this.addFieldsValidators();
    this.addGroupRequiredValidators();

    this.group.valueChanges.subscribe(_ => {
      this.group.get('openingHour').updateValueAndValidity({emitEvent: false});
      this.group.get('closingHour').updateValueAndValidity({emitEvent: false});
    });
  }

  addFieldsValidators(): void {
    const controlOpeningHour = this.group.get('openingHour');
    const controlClosingHour = this.group.get('closingHour');
    const openingHourValidators = [];
    const closingHourValidators = [];

    // set validators
    openingHourValidators.push(this.isOpeningAfterClosing);
    closingHourValidators.push(this.isOpeningAfterClosing);
    if (this.isRequired) {
      openingHourValidators.push(Validators.required);
      closingHourValidators.push(Validators.required);
    }
    controlOpeningHour.setValidators(openingHourValidators);
    controlClosingHour.setValidators(closingHourValidators);
  }

  addGroupRequiredValidators(): void {
    const groupValidators = [];
    groupValidators.push(this.isOpeningAfterClosing);
    if (this.isRequired) { groupValidators.push(this.requiredHours); }
    this.group.setValidators(groupValidators)
  }

  private isOpeningAfterClosing = (): SpecificValidator => {
    if (
      this.group.get('openingHour').pristine &&
      this.group.get('closingHour').pristine
    ) {
      return null;
    }

    const controlOpeningHour = this.group.get('openingHour');
    const controlClosingHour = this.group.get('closingHour');
    const momentOpeningHour = moment(controlOpeningHour.value, 'HH:mm');
    const momentClosingHour = moment(controlClosingHour.value, 'HH:mm');
    return moment(momentOpeningHour).isBefore(momentClosingHour) ?
      null :
      {openingAfterClosing: true}
  };

  private requiredHours = (group: FormGroup): SpecificValidator => {
    const openingHour = group.get('openingHour').value;
    const closingHour = group.get('closingHour').value;
    return openingHour && closingHour ? null : {requiredHours: true};
  }
}
