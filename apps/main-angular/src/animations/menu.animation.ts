import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import {
  FADE_IN_LANDING_PAGE_TIMING,
  MENU_TRANSLATION_TIMING
} from '@constants';
import { MenuAnimationEnum } from '@enums';

export const menuAnimation: AnimationTriggerMetadata = trigger(
  'menuAnimation',
  [
    state(
      MenuAnimationEnum.Closed,
      style({
        opacity: 0
      })
    ),
    state(
      MenuAnimationEnum.Transit,
      style({
        opacity: 0
      })
    ),
    state(
      MenuAnimationEnum.Open,
      style({
        opacity: 1
      })
    ),
    transition(`${MenuAnimationEnum.Open} => ${MenuAnimationEnum.Closed}`, [
      animate(
        MENU_TRANSLATION_TIMING,
        keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 0.2 })
        ])
      )
    ]),
    transition(`${MenuAnimationEnum.Transit} => ${MenuAnimationEnum.Open}`, [
      animate(FADE_IN_LANDING_PAGE_TIMING)
    ])
  ]
);
