import {animate, group, query, state, style, transition, trigger} from "@angular/animations";

export function routerTransition() {
  return fadeAnimation();
}

function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({transform: 'translateX(100%)'}),
      animate('0.25s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    // transition(':leave', [  // before 2.1: transition('* => void', [
    //   style({transform: 'translateX(-100%)'}),
    //   animate('0.25s ease-in-out', style({transform: 'translateX(-100%)'}))
    // ])
  ]);
}

function fadeAnimation() {
  return trigger('routerTransition', [
    // route 'enter and leave (<=>)' transition
    transition('*<=>*', [
      // css styles at start of transition
      style({ opacity: 0 }),
      // animation and styles at end of transition
      animate('0.2s', style({ opacity: 1 }))
    ]),
  ]);
}
