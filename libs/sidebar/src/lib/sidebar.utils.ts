import { SidebarPosition, SidebarStatus, SidebarTouchDirection } from './sidebar.enum';

export const getTouchDirection = (start: Touch, end: Touch): SidebarTouchDirection =>
  start.clientX > end.clientX ? SidebarTouchDirection.LEFT : SidebarTouchDirection.RIGHT;

export function determineEvent(
  direction: SidebarTouchDirection,
  position: SidebarPosition
): SidebarStatus {
  if (
    (position === SidebarPosition.LEFT && direction === SidebarTouchDirection.RIGHT) ||
    (position === SidebarPosition.RIGHT && direction === SidebarTouchDirection.LEFT)
  ) {
    return SidebarStatus.OPEN;
  } else {
    return SidebarStatus.CLOSE;
  }
}
