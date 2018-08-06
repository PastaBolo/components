import {
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeAheadComponent } from './type-ahead.component';

describe('Directive: TypeAhead', () => {
  let component: TypeAheadComponent;
  let fixture: ComponentFixture<TypeAheadComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ TypeAheadComponent, TypeAheadComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAheadComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    const debounceTime = 5;
    const searchCallback = (search: string): Promise<any> =>
      new Promise(res => { res(['Paris', 'Marseille', 'Lyon']); })

    component.debounceTime = debounceTime;
    component.onKeyUpCallback = searchCallback;

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searching', () => {
    it('should set the results', fakeAsync(() => {
      element.triggerEventHandler('keyup', {target: {value: 'a'}});
      tick(component.debounceTime);
      expect(component.results).toEqual(['Paris', 'Marseille', 'Lyon']);
    }));

    it('should launch the search with debounceTime', fakeAsync(() => {
      element.triggerEventHandler('keyup', {target: {value: 'a'}});
      expect(component.results).toBeUndefined();
      tick(component.debounceTime - 1);
      element.triggerEventHandler('keyup', {target: {value: 'a'}});
      tick(component.debounceTime - 1);
      expect(component.results).toBeUndefined();
      tick(1);
      expect(component.results).toEqual(['Paris', 'Marseille', 'Lyon']);
    }));

    it('should reduce the length of the result', fakeAsync(() => {
      const length = 2;
      component.listMaxLength = length;
      element.triggerEventHandler('keyup', {target: {value: 'a'}});
      tick(component.debounceTime);
      expect(component.results).toEqual(['Paris', 'Marseille']);
    }));
  });

  describe('focus event on element', () => {
    it('should set InputFocused to true', () => {
      expect((<any> component).inputFocused).toBe(false);
      element.triggerEventHandler('focus', {});
      expect((<any> component).inputFocused).toBe(true);
    });

    it('should set displayResults to true after the search', fakeAsync(() => {
      element.triggerEventHandler('focus', {});
      element.triggerEventHandler('keyup', {target: {value: 'a'}});
      tick(component.debounceTime);
      expect(component.displayResults).toBe(true);
    }));
  });

  describe('blur event on element', () => {
    beforeEach(fakeAsync(() => {
      element.triggerEventHandler('keyup', {target: {value: 'a'}});
      tick(component.debounceTime);
    }));

    it('should set displayResults to false if no result is clicked', () => {
      component.displayResults = true;
      component.mouseOverList = false;
      element.triggerEventHandler('blur', {});
      expect(component.displayResults).toBe(false);
    });

    it('should set inputFocused to false', () => {
      (<any> component).inputFocused = true;
      element.triggerEventHandler('blur', {});
      expect((<any> component).inputFocused).toBe(false);
    });
  });

  describe('cliking on an item in the results list', () => {
    it('should emit an itemSelected event', () => {
      const item = 'test';
      spyOn(component.itemSelected, 'emit');
      component.onClickItem(item);
      expect(component.itemSelected.emit).toHaveBeenCalledWith(item);
    });

    it('should set displayResults to false', () => {
      component.displayResults = true;
      component.onClickItem('test');
      expect(component.displayResults).toBe(false);
    });
  });
});
