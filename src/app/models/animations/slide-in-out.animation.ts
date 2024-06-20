import { transition, trigger, query, style, animate, group } from '@angular/animations';
export const slideInOutAnimation =
  trigger('slideAnimation', [
    transition('MailList => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '84.5%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('.3s', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('.3s', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('Mail => MailList', [
      query(':enter, :leave', style({ position: 'fixed', width: '84.5%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('.3s', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('.3s', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
  ]);