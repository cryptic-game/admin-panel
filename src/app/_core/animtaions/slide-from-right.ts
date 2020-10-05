import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideFromRight = trigger('slideFromRight', [
  state('void', style({ width: '0' })),
  state('closed', style({ width: '100%' })),
  transition(':enter, :leave', animate('200ms cubic-bezier(0.35, 0, 0.25, 1)')),
]);
