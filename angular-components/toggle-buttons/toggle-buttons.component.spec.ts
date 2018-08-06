/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ToggleButtonsComponent } from './toggle-buttons.component';

describe('ToggleButtonsComponent', () => {
  let component: ToggleButtonsComponent;
  let element: any;
  let fixture: ComponentFixture<ToggleButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleButtonsComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleButtonsComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changing the state of the control', () => {
    beforeEach(() => {
      component.control.setValue(false);
      component.references = {
        checked: 'Oui',
        unchecked: 'Non'
      };
      fixture.detectChanges();
    });

    it('should set the control to true', () => {
      element.querySelector('label:not(.active)').click();
      expect(component.control.value).toEqual(true);
    });
  });
});
