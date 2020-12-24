import {
    trigger,
    transition,
    animate,
    style,
    query,
    group,
    keyframes,
} from '@angular/animations';

// Basic

export const fader = trigger('routeAnimations', [
    transition('*<=>*', [
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    width: '100%',
                    left: 0,
                    opacity: 0,
                    // transform: 'scale(0) translateY(100%)',
                }),
            ],
            {
                optional: true,
            }
        ),
        query(
            ':enter',
            [
                animate('2000ms ease-out'),
                style({
                    opacity: 1,
                    // transform: 'scale(0) translateY(0)',
                }),
            ],
            {
                optional: true,
            }
        ),
    ]),
]);

export const slidder = trigger('routeAnimations', [
    transition('*=>isLeft', slideTo('left')),
    transition('*=>isRight', slideTo('right')),
    transition('isRight=>*', slideTo('left')),
    transition('isLeft=>*', slideTo('right')),
]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    top: 0,
                    [direction]: 0,
                    width: '100%',
                }),
            ],
            optional
        ),
        query(':enter', [style({ [direction]: '-100%' })],optional),
        group([
            query(
                ':leave',
                [animate('600ms ease', style({ [direction]: '100%' }))],
                optional
            ),
            query(':enter', [
                animate('600ms ease', style({ [direction]: '0%' })),
            ], optional),
        ]),
        // Normalize the page style... Might not be necessary

        // Required only if you have child animations on the page
        // query(':leave', animateChild()),
        // query(':enter', animateChild()),
    ];
}

export const transformer = trigger('routeAnimations', [
    transition('*=>isLeft', translateTo({ x: -100, y: -100, rotate: 720 })),
    transition('*=>isRight', translateTo({ x: 100, y: -100, rotate: 90 })),
    transition('isRight=>*', translateTo({ x: -100, y: -100, rotate: 720 })),
    transition('isLeft=>*', translateTo({ x: -100, y: -100, rotate: 360 })),
]);

function translateTo({ x = 100, y = 0, rotate = 0 }) {
    const optional = { optional: true };
    return [
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                }),
            ],
            optional
        ),
        query(':enter', [
            style({
                transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`,
            }),
        ]),
        group([
            query(
                ':enter',
                [
                    animate(
                        '700ms ease',
                        style({
                            transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`,
                        })
                    ),
                ],
                optional
            ),
            query(
                ':leave',
                [
                    animate(
                        '700ms ease',
                        style({ transform: `translate(0,0) rotate(0)` })
                    ),
                ],
                optional
            ),
        ]),
    ];
}

export const stepper = trigger('routeAnimations', [
    transition('*<=>*', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left: 0,
                width: '100%',
            }),
        ]),
        group([
            query(':enter', [
                animate(
                    '2000ms ease',
                    keyframes([
                        style({
                            transform: 'scale(0) translateX(100%)',
                            offset: 0,
                        }),
                        style({
                            transform: 'scale(0.5) translateX(25%)',
                            offset: 0.3,
                        }),
                        style({
                            transform: 'scale(1) translateX(0%)',
                            offset: 1,
                        }),
                    ])
                ),
            ]),
            query(':leave', [
                animate(
                    '2000ms ease',
                    keyframes([
                        style({ transform: 'scale(1)', offset: 0 }),
                        style({
                            transform: 'scale(0.5) translateX(-25%)',
                            offset: 0.35,
                        }),
                        style({
                            transform:
                                'scale(1) translateX(-50%) rotate(-180%)',
                            opacity: 0,
                            offset: 1,
                        }),
                    ])
                ),
            ]),
        ]),
    ]),
]);
