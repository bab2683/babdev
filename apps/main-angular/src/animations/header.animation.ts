import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { FADE_IN_HEADER, MENU_TRANSLATION_TIMING } from '@constants';
import { HeaderAnimationEnum } from '@enums';

export const floatingHeaderAnimation: AnimationTriggerMetadata = trigger(
  'floatingHeaderAnimation',
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

export const headerBgAnimation = trigger('headerBgAnimation', [
  transition(':increment', [
    query(
      '.header__bg',
      [
        animate(
          FADE_IN_HEADER,
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0, offset: 0.95 }),
            style({ opacity: 1, offset: 1 })
          ])
        )
      ],
      { optional: true }
    )
  ])
]);
