import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { MENU_TRANSLATION_TIMING } from '@constants';
import { MenuAnimationEnum } from '@enums';

export const menuAnimation: AnimationTriggerMetadata = trigger(
  'menuAnimation',
  [
    state(
      MenuAnimationEnum.Closed,
      style({
        transform: 'translateY(-100%)'
      })
    ),
    state(
      MenuAnimationEnum.Open,
      style({
        transform: 'translateY(0)'
      })
    ),
    transition(`${MenuAnimationEnum.Closed} <=> ${MenuAnimationEnum.Open}`, [
      animate(MENU_TRANSLATION_TIMING)
    ])
  ]
);
