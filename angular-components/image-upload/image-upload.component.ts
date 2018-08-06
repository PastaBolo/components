import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-upload',
  template: require('./image-upload.component.html'),
  styles: [`${require('./image-upload.component.less')}`]
})
export class ImageUploadComponent {
  dragging = false;
  @ViewChild('inputFile') inputFile: ElementRef;
  @Output() receivedData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private imageService: ImageService) {}

  onDragOver(e): void {
    e.preventDefault();
    e.stopPropagation();
  }

  onDrop(e): void {
    e.preventDefault();
    e.stopPropagation();
    this.dragging = false;
    this.inputFile.nativeElement.files = e.dataTransfer.files;
  }

  onChange(e): void {
    const params = {ImageFormat: 'Bigs', ProviderType: 3};
    const file = e.target.files[0];
    this.imageService.upload(file, params).subscribe(
      data => this.receivedData.emit(data)
    );
  }
}
