import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { getCssVariableValue } from '@babdev/utils';

import { SidebarStatus } from './sidebar.enum';

const cssVariableStyle: string = getCssVariableValue('--babdev-sidebar-animation');
const animationStyle: string = cssVariableStyle ? cssVariableStyle : '300ms ease';

export const sidebarTranslateAnimation: AnimationTriggerMetadata = trigger(
  'sidebarTranslateAnimation',
  [
    state(
      SidebarStatus.CLOSE,
      style({
        /* stylelint-disable */
        transform: 'translateX(-100%)'
        /* stylelint-enable */
      })
    ),
    state(
      SidebarStatus.OPEN,
      style({
        /* stylelint-disable */
        transform: 'translateX(0)'
        /* stylelint-enable */
      })
    ),
    state(
      SidebarStatus.OPENING,
      style({
        /* stylelint-disable */
        transform: 'translateX(0)'
        /* stylelint-enable */
      })
    ),
    state(
      SidebarStatus.CLOSING,
      style({
        /* stylelint-disable */
        transform: 'translateX(-100%)'
        /* stylelint-enable */
      })
    ),
    transition(`${SidebarStatus.CLOSE} => ${SidebarStatus.OPENING}`, [animate(animationStyle)]),
    transition(`${SidebarStatus.OPEN} => ${SidebarStatus.CLOSING}`, [animate(animationStyle)])
  ]
);

export const overlayAnimation: AnimationTriggerMetadata = trigger('overlayAnimation', [
  state(
    SidebarStatus.CLOSE,
    style({
      /* stylelint-disable */
      opacity: '0'
      /* stylelint-enable */
    })
  ),
  state(
    SidebarStatus.CLOSING,
    style({
      /* stylelint-disable */
      opacity: '0'
      /* stylelint-enable */
    })
  ),
  state(
    SidebarStatus.OPEN,
    style({
      /* stylelint-disable */
      opacity: '1'
      /* stylelint-enable */
    })
  ),
  state(
    SidebarStatus.OPENING,
    style({
      /* stylelint-disable */
      opacity: '1'
      /* stylelint-enable */
    })
  ),
  transition(`${SidebarStatus.CLOSE} => ${SidebarStatus.OPENING}`, [animate(animationStyle)]),
  transition(`${SidebarStatus.OPEN} => ${SidebarStatus.CLOSING}`, [animate(animationStyle)])
]);
