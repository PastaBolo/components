import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { MultipleOptionsComponent
} from './multiple-options/multiple-options.component';
import { RadioComponent } from './radio/radio.component';
import { ToggleSliderComponent } from './toggle-slider/toggle-slider.component';
import {
  ToggleButtonsComponent
} from './toggle-buttons/toggle-buttons.component';
import { InputTimeComponent } from './input-time/input-time.component';
import {
  FormErrorMessagesComponent
} from './form-error-messages/form-error-messages.component';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';
import { InputSymbolComponent } from './input-symbol/input-symbol.component';
import {
  DynamicMultipleOptionsDirective
} from './dynamic-multiple-options/dynamic-multiple-options.directive';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageService } from './image-upload/image.service';
import { HttpClientModule } from '@angular/common/http';
import {
  ImageControlsComponent
} from './image-upload/image-controls/image-controls.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    UpgradeModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot()
  ],
  exports: [
    OpeningHoursComponent,
    MultipleOptionsComponent,
    RadioComponent,
    ToggleButtonsComponent,
    ToggleSliderComponent,
    InputTimeComponent,
    FormErrorMessagesComponent,
    TypeAheadComponent,
    InputSymbolComponent,
    DynamicMultipleOptionsDirective,
    ImageUploadComponent,
    ImageControlsComponent
  ],
  declarations: [
    OpeningHoursComponent,
    MultipleOptionsComponent,
    RadioComponent,
    ToggleButtonsComponent,
    ToggleSliderComponent,
    InputTimeComponent,
    FormErrorMessagesComponent,
    TypeAheadComponent,
    InputSymbolComponent,
    DynamicMultipleOptionsDirective,
    ImageUploadComponent,
    ImageControlsComponent
  ],
  providers: [
    ImageService
  ]
})
export class ComponentsModule { }
