/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleSliderComponent } from './toggle-slider.component';

describe('ToggleSliderComponent', () => {
  let component: ToggleSliderComponent;
  let element: any;
  let fixture: ComponentFixture<ToggleSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ToggleSliderComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleSliderComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch the state of the control', () => {
    component.control.setValue(false);
    fixture.detectChanges();
    element.querySelector('input[type="checkbox"]').click();
    expect(component.control.value).toEqual(true);
  });
});
