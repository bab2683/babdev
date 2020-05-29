import { BackGroundPositionXEnum, BackGroundPositionYEnum } from '../enums';

export interface BgModel {
  path: string;
  positionX?: BackGroundPositionXEnum | number;
  positionY?: BackGroundPositionYEnum | number;
}
