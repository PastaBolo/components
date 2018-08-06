// tslint:disable:no-magic-numbers
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  MultipleOptionsComponent
} from '../multiple-options/multiple-options.component';
import {
  DynamicMultipleOptionsDirective
} from './dynamic-multiple-options.directive';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

const allReferences = [
  { Label: 'Option1', Id: 1 },
  { Label: 'Option2', Id: 2 },
  { Label: 'Option3', Id: 3 }
];

@Component({
  template: `
    <app-multiple-options
      [appDynamicMultipleOptions]="listToDisplay"
      [control]="control"
      [references]="references"></app-multiple-options>
    `
})
class TestDynamicMultipleOptionsComponent {
  listToDisplay: number[];
  control = new FormControl([]);
  references: any[] = allReferences;
}

describe('Directive: DynamicMultipleOptions', () => {
  let fixture: ComponentFixture<TestDynamicMultipleOptionsComponent>;
  let component: TestDynamicMultipleOptionsComponent;
  let hostComponent: MultipleOptionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDynamicMultipleOptionsComponent,
        MultipleOptionsComponent,
        DynamicMultipleOptionsDirective
      ]
    });
    fixture = TestBed.createComponent(TestDynamicMultipleOptionsComponent);
    component = fixture.componentInstance;
    hostComponent = fixture.debugElement
      .query(By.css('app-multiple-options')).componentInstance;
  });

  it('should update the references to display', () => {
    const updatedReferences = [
      { Label: 'Option1', Id: 1 },
      { Label: 'Option3', Id: 3 }
    ];
    component.listToDisplay = [1, 3];
    fixture.detectChanges();
    expect(hostComponent.references).toEqual(updatedReferences);
  });

  it('should remove unselected values from the control', () => {
    component.control.setValue([1, 2, 3]);
    component.listToDisplay = [2, 3];
    fixture.detectChanges();
    expect(component.control.value).toEqual([2, 3]);
  });
});
