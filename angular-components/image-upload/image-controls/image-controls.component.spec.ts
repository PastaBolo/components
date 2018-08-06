import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageControlsComponent } from './image-controls.component';

describe('ImageControlsComponent', () => {
  let component: ImageControlsComponent;
  let fixture: ComponentFixture<ImageControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
