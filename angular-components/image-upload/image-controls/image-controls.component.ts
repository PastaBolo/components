import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-controls',
  template: require('./image-controls.component.html'),
  styles: [`${require('./image-controls.component.less')}`]
})
export class ImageControlsComponent {
  @Input() url: string;
}
