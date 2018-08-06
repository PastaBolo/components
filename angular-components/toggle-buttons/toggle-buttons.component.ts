import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toggle-buttons',
  template: require('./toggle-buttons.component.html'),
  styles: [`${require('./toggle-buttons.component.less')}`]
})
export class ToggleButtonsComponent {
  @Input() control: FormControl;
  @Input() references: any;
}
