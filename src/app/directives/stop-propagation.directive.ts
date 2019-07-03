import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
