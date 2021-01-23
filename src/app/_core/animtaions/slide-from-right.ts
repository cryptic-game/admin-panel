import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideFromRight = trigger('slideFromRight', [
  state('void', style({transform: 'translateX(100%)'})),

  transition(':enter, :leave', [
    animate('250ms cubic-bezier(0.35, 0, 0.25, 1)')
  ])
]);
