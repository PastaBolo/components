import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toggle-slider',
  template: require('./toggle-slider.component.html'),
  styles: [`${require('./toggle-slider.component.less')}`]
})
export class ToggleSliderComponent {
  @Input() control: FormControl;
}
