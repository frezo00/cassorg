import { animate, state, style, transition, trigger } from '@angular/animations';

export const toggleSideMenu = trigger('toggleSideMenu', [
  state('wide', style({ width: '280px' })),
  state('shrink', style({ width: '68px' })),
  transition('wide <=> shrink', animate('0.3s ease-out'))
]);
