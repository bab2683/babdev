import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { MENU_TRANSLATION_TIMING } from '@constants';
import { HeaderAnimationEnum } from '@enums';

export const headerAnimation: AnimationTriggerMetadata = trigger(
  'headerAnimation',
  [
    state(
      HeaderAnimationEnum.Base,
      style({
        left: '40%',
        top: '40%',
        transform: 'translate(-50%, -50%)'
      })
    ),
    state(
      HeaderAnimationEnum.Translated,
      style({
        left: '1vw',
        top: '0',
        transform: 'translate(0%, -100%)'
      })
    ),
    transition(
      `${HeaderAnimationEnum.Base} <=> ${HeaderAnimationEnum.Translated}`,
      [animate(MENU_TRANSLATION_TIMING)]
    )
  ]
);
