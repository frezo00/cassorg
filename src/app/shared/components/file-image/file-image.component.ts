import { Component, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-image',
  templateUrl: './file-image.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileImageComponent,
      multi: true
    }
  ]
})
export class FileImageComponent {
  onChange: Function;
  previewImage: string | ArrayBuffer;

  private file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file: File = event && event.item(0);
    if (file) {
      this.onImagePreview(file);
      this.onChange(file);
      this.file = file;
    }
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  onImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = _e => (this.previewImage = reader.result);
    reader.readAsDataURL(file);
  }

  onImageRemove(): void {
    this.writeValue(null);
    this.onChange(this.file);
    this.previewImage = '';
  }

  writeValue(value: null): void {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
}
