import { SidebarPosition, SidebarStatus, SidebarTouchDirection } from '../sidebar.enum';
import { determineEvent, getTouchDirection } from '../sidebar.utils';

describe('sidebar utils', () => {
  describe('getTouchDirection', () => {
    let start: any;
    let end: any;
    let result: SidebarTouchDirection;

    it('should return SidebarTouchDirection.RIGHT', () => {
      start = { clientX: 10 } as any;
      end = { clientX: 20 } as any;
      result = getTouchDirection(start, end);

      expect(result).toEqual(SidebarTouchDirection.RIGHT);
    });

    it('should return SidebarTouchDirection.LEFT', () => {
      start = { clientX: 30 } as any;
      end = { clientX: 20 } as any;
      result = getTouchDirection(start, end);

      expect(result).toEqual(SidebarTouchDirection.LEFT);
    });
  });

  describe('determineEvent', () => {
    let direction: SidebarTouchDirection;
    let position: SidebarPosition;
    let result: SidebarStatus;

    describe('OPEN', () => {
      it('should return SidebarStatus.OPEN', () => {
        direction = SidebarTouchDirection.RIGHT;
        position = SidebarPosition.LEFT;
        result = determineEvent(direction, position);

        expect(result).toEqual(SidebarStatus.OPEN);
      });

      it('should return SidebarStatus.OPEN', () => {
        direction = SidebarTouchDirection.LEFT;
        position = SidebarPosition.RIGHT;
        result = determineEvent(direction, position);

        expect(result).toEqual(SidebarStatus.OPEN);
      });
    });

    it('should return SidebarStatus.CLOSE', () => {
      direction = SidebarTouchDirection.LEFT;
      position = SidebarPosition.LEFT;
      result = determineEvent(direction, position);

      expect(result).toEqual(SidebarStatus.CLOSE);
    });
  });
});
