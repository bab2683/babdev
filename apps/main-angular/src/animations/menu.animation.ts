import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { MenuAnimationEnum } from '@enums';

export const menuAnimation: AnimationTriggerMetadata = trigger('menuAnimation', [
  state(
    MenuAnimationEnum.Base,
    style({
      left: '40%',
      top: '40%',
      transform: 'translate(-50%, -50%)'
    })
  ),
  state(
    MenuAnimationEnum.Translated,
    style({
      left: '1vw',
      top: '1vh',
      transform: 'translate(0%, 0%)'
    })
  ),
  transition(`${MenuAnimationEnum.Base} <=> ${MenuAnimationEnum.Translated}`, [animate('700ms')])
]);
