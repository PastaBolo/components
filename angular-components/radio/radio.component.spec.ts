/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let element: any;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handling value of type number', () => {
    const informatiqueId = 1;
    const designId = 2;
    beforeEach(() => {
      component.references = [
        { Label: 'informatique', Id: informatiqueId },
        { Label: 'design', Id: designId }
      ];
      fixture.detectChanges();
    });

    describe('set the value', () => {
      it('should add informatiqueId to control', () => {
        element.querySelectorAll('label')[0].click();
        expect(component.control.value).toEqual(informatiqueId);
      });
    });

    describe('changing the value of the control', () => {
      beforeEach(() => {
        component.control.setValue(informatiqueId);
        fixture.detectChanges();
      });

      it('change the value of the control', () => {
        element.querySelectorAll('label')[1].click();
        expect(component.control.value).toEqual(designId);
      });
    });
  });

  describe('handling value of type string', () => {
    beforeEach(() => {
      component.references = [
        { Label: 'informatique', Id: '1' },
        { Label: 'design', Id: '2' }
      ];
      fixture.detectChanges();
    });

    describe('set the value', () => {
      it('should add informatiqueId to control', () => {
        element.querySelectorAll('label')[0].click();
        expect(component.control.value).toEqual('1');
      });
    });

    describe('changing the value of the control', () => {
      beforeEach(() => {
        component.control.setValue('1');
        fixture.detectChanges();
      });

      it('change the value of the control', () => {
        element.querySelectorAll('label')[1].click();
        expect(component.control.value).toEqual('2');
      });
    });
  });
});
