import { animate, style, transition, trigger } from '@angular/animations';

export const bottomToTop = trigger('bottomToTop', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate('0.3s ease-out', style({ transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)' }),
    animate('0.3s ease-in', style({ transform: 'translateY(100%)' }))
  ])
]);
