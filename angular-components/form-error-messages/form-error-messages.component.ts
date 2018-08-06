import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-messages',
  template: require('./form-error-messages.component.html'),
  styles: [`${require('./form-error-messages.component.less')}`]
})
export class FormErrorMessagesComponent {
  @Input() control: FormControl;
  @Input() displayable: boolean = true;
}
