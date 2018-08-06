/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MultipleOptionsComponent } from './multiple-options.component';

describe('MultipleOptionsComponent', () => {
  let component: MultipleOptionsComponent;
  let element: any;
  let fixture: ComponentFixture<MultipleOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleOptionsComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleOptionsComponent);
    component = fixture.componentInstance;
    component.control = new FormControl([]);
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handling list of type number', () => {
    const informatiqueId = 1;
    const designId = 2;
    beforeEach(() => {
      component.references = [
        { Label: 'informatique', Id: informatiqueId },
        { Label: 'design', Id: designId }
      ];
      fixture.detectChanges();
    });

    describe('adding element to the list', () => {
      it('should add informatiqueId to the list', () => {
        element.querySelectorAll('label')[0].click();
        expect(component.control.value).toEqual([informatiqueId]);
      });
    });

    describe('removing element from the list', () => {
      beforeEach(() => {
        component.control.setValue([informatiqueId, designId]);
        fixture.detectChanges();
      });

      it('should remove designId from the list', () => {
        element.querySelectorAll('label')[1].click();
        expect(component.control.value).toEqual([informatiqueId]);
      });
    });
  });

  describe('handling list of type string', () => {
    beforeEach(() => {
      component.references = [
        { Label: 'informatique', Id: '1' },
        { Label: 'design', Id: '2' }
      ];
      fixture.detectChanges();
    });

    describe('adding element to the list', () => {
      it('should add "1" to the list', () => {
        element.querySelectorAll('label')[0].click();
        expect(component.control.value).toEqual(['1']);
      });
    });

    describe('removing element from the list', () => {
      beforeEach(() => {
        component.control.setValue(['1', '2']);
        fixture.detectChanges();
      });

      it('should remove "2" from the list', () => {
        element.querySelectorAll('label')['1'].click();
        expect(component.control.value).toEqual(['1']);
      });
    });
  });
});
