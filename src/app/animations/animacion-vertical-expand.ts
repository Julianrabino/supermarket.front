import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const animacionVerticalExpand = trigger('verticalExpand', [
    transition(':enter', [
        style({
            height: 0, 'padding-top': 0, 'padding-bottom': 0,
            'margin-top': 0, 'margin-bottom': 0, 'min-height': 0, overflow: 'hidden'
        }),
        animate(250, style({ height: '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*' }))
    ]),
    transition(':leave', [
        animate(250, style({
            height: 0, 'padding-top': 0, 'padding-bottom': 0,
            'margin-top': 0, 'margin-bottom': 0, 'min-height': 0, overflow: 'hidden'
        }))
    ])
]);
