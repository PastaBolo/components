import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  ElementRef,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
  HostListener,
  EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appTypeAhead]',
  template: require('./type-ahead.component.html'),
  styles: [`${require('./type-ahead.component.less')}`]
})
export class TypeAheadComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('typeAheahDisabled') disabled: boolean = false;
  @Input() debounceTime: number = 500;
  @Input() onKeyUpCallback: (search: string) => Promise<any>;
  @Input() propertyToDisplay: string;
  @Input() propertyToDisplayInput: string;
  @Input() listMaxLength: number = 10;
  @Output() itemSelected = new EventEmitter<any>();
  @ViewChild('tpl') tplRef: TemplateRef<any>;
  results: any[];
  displayResults: boolean = false;
  mouseOverList: boolean = false;
  private inputFocused: boolean = false;
  private onKeyUpSubject: Subject<any> = new Subject();

  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (!this.propertyToDisplayInput) {
      this.propertyToDisplayInput = this.propertyToDisplay;
    }
    this.viewContainer.createEmbeddedView(this.tplRef);
    this.onKeyUpSubject
    .debounceTime(this.debounceTime)
    .subscribe(value => {
      this.onKeyUpCallback(value)
      .then(results => {
        this.results = results.slice(0, this.listMaxLength);
        this.displayResults = this.inputFocused;
      })
      .catch();
    });
  }

  ngOnDestroy(): void {
    this.onKeyUpSubject.unsubscribe();
  }

  @HostListener('keyup', ['$event']) onKeyUp(event) {
    if (!this.disabled) {
      this.onKeyUpSubject.next(event.target.value);
    }
  }

  @HostListener('focus') onfocus() {
    this.inputFocused = true;
  }

  @HostListener('blur') onBlur() {
    if (!this.mouseOverList) {
      this.displayResults = false;
    }
    this.inputFocused = false;
  }

  onClickItem(item: any): void {
    this.element.nativeElement.value = item[this.propertyToDisplayInput];
    this.itemSelected.emit(item);
    this.displayResults = false;
  }
}
