import { SidebarPosition, SidebarStatus, SidebarTouchDirection } from './sidebar.enum';

export function getTouchDirection(
  start: Touch,
  end: Touch
): { direction: SidebarTouchDirection; distance: number } {
  const direction: SidebarTouchDirection =
    start.clientX > end.clientX ? SidebarTouchDirection.LEFT : SidebarTouchDirection.RIGHT;
  const distance: number =
    direction === SidebarTouchDirection.LEFT
      ? start.clientX - end.clientX
      : end.clientX - start.clientX;
  return { direction, distance };
}

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
