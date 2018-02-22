import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
