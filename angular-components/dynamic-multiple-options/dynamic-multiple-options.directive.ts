import {
  Directive,
  Host,
  OnChanges,
  Input,
  SimpleChanges,
  SimpleChange,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {
  MultipleOptionsComponent
} from '../multiple-options/multiple-options.component';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDynamicMultipleOptions]'
})
export class DynamicMultipleOptionsDirective implements
  OnChanges, OnDestroy, AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input('appDynamicMultipleOptions') listToDisplay: number[];
  // tslint:disable-next-line:no-input-rename
  @Input('references') allReferences: any;
  private itemsChangesSubscription: Subscription;

  constructor(@Host() private hostMultipleOptions: MultipleOptionsComponent) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('listToDisplay')) {
      this.updateReferencesToDisplay(changes.listToDisplay);
      this.updateControlValue(changes.listToDisplay);
    }
  }

  ngAfterViewInit(): void {
    this.itemsChangesSubscription =
      this.hostMultipleOptions.items.changes.subscribe(() => {
        this.hostMultipleOptions.addClasses();
      });
  }

  ngOnDestroy(): void {
    this.itemsChangesSubscription.unsubscribe();
  }

  private updateReferencesToDisplay(newListToDisplay: SimpleChange): void {
    this.hostMultipleOptions.references = this.allReferences.filter(ref =>
      // tslint:disable-next-line:no-magic-numbers
      newListToDisplay.currentValue.indexOf(ref.Id) !== -1
    );
  }

  private updateControlValue(newListToDisplay: SimpleChange): void {
    const control = this.hostMultipleOptions.control;
    control.setValue(
      control.value.filter(id =>
        // tslint:disable-next-line:no-magic-numbers
        newListToDisplay.currentValue.indexOf(id) !== -1
      )
    );
  }
}
