import {
  animate,
  AnimationTriggerMetadata,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

import {
  FADE_IN_LANDING_PAGE_TIMING,
  FADE_IN_LANDING_PAGE_TO_HOMEPAGE_TIMING,
  MENU_TRANSLATION_TIMING
} from '@constants';
import { PageNames } from '@enums';

export const routerAnimation: AnimationTriggerMetadata = trigger(
  'routerAnimation',
  [
    transition(`${PageNames.HOME} => *`, [
      style({ position: 'relative' }),
      query(
        ':enter, :leave',
        [
          style({
            height: '100%',
            opacity: 0,
            position: 'absolute',
            width: '100%'
          })
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            opacity: 1
          }),
          animate(
            MENU_TRANSLATION_TIMING,
            style({
              opacity: 0
            })
          )
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            opacity: 0
          }),
          animate(
            MENU_TRANSLATION_TIMING,
            style({
              opacity: 1
            })
          )
        ],
        { optional: true }
      )
    ]),

    transition(`* => ${PageNames.HOME}`, [
      style({ position: 'relative' }),
      query(
        ':enter, :leave',
        [
          style({
            height: '100%',
            opacity: 0,
            position: 'absolute',
            width: '100%'
          })
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            opacity: 1
          }),
          animate(
            FADE_IN_LANDING_PAGE_TO_HOMEPAGE_TIMING,
            style({
              opacity: 0
            })
          )
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            opacity: 0
          }),
          animate(
            FADE_IN_LANDING_PAGE_TO_HOMEPAGE_TIMING,
            style({
              opacity: 1
            })
          )
        ],
        { optional: true }
      )
    ]),
    transition('* <=> *', [
      query(
        ':enter, :leave',
        [
          style({
            height: '100%',
            opacity: 0,
            position: 'absolute',
            width: '100%'
          })
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            opacity: 1
          }),
          animate(
            FADE_IN_LANDING_PAGE_TIMING,
            style({
              opacity: 0
            })
          )
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            opacity: 0
          }),
          animate(
            FADE_IN_LANDING_PAGE_TIMING,
            style({
              opacity: 1
            })
          )
        ],
        { optional: true }
      )
    ])
  ]
);
