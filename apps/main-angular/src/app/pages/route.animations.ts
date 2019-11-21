import {
  animate,
  AnimationTriggerMetadata,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fade: AnimationTriggerMetadata = trigger('routerAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          /* stylelint-disable */
          opacity: 0,
          position: 'absolute',
          width: '100%'
          /* stylelint-enable */
        })
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          /* stylelint-disable */
          opacity: 1,
          transform: 'translateX(0)'
          /* stylelint-enable */
        }),
        animate(
          '200ms ease',
          style({
            /* stylelint-disable */
            transform: 'translateX(100%)'
            /* stylelint-enable */
          })
        )
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({
          /* stylelint-disable */
          transform: 'translateX(-100%)'
          /* stylelint-enable */
        }),
        animate(
          '200ms ease',
          style({
            /* stylelint-disable */
            opacity: 1,
            transform: 'translateX(0)'
            /* stylelint-enable */
          })
        )
      ],
      { optional: true }
    )
  ])
]);
