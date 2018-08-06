import {
  Component,
  Input,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio',
  template: require('./radio.component.html'),
  styles: [`${require('./radio.component.less')}`]
})
export class RadioComponent implements AfterViewInit {
  @Input() control: FormControl;
  @Input() references: any;
  @Input() colBootstrapClasses: string[] = [];
  @ViewChildren('item') items: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.addClasses();
  }

  private addClasses() {
    this.items.toArray().forEach(item => {
      this.colBootstrapClasses.forEach(className => {
        this.renderer.addClass(item.nativeElement, className);
      });
    });
  }

  updateChoice(e): void {
    this.control.setValue(this.cast(e.target.value));
  }

  private cast(value): any {
    return typeof this.references[0].Id === 'number' ? +value : value
  }
}
