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
  selector: 'app-multiple-options',
  template: require('./multiple-options.component.html'),
  styles: [`${require('./multiple-options.component.less')}`]
})
export class MultipleOptionsComponent implements AfterViewInit {
  @Input() control: FormControl;
  @Input() references: any;
  @Input() colBootstrapClasses: string[] = [];
  @ViewChildren('item') items: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.addClasses();
  }

  addClasses() {
    this.items.toArray().forEach(item => {
      this.colBootstrapClasses.forEach(className => {
        this.renderer.addClass(item.nativeElement, className);
      });
    });
  }

  updateList(e) {
    const option = this.cast(e.target.value);
    const checkedOptions = new Set(this.control.value);
    e.target.checked ?
      checkedOptions.add(option) :
      checkedOptions.delete(option);
    this.control.setValue(Array.from(checkedOptions));
  }

  private cast(value) {
    return typeof this.references[0].Id === 'number' ? +value : value
  }
}
