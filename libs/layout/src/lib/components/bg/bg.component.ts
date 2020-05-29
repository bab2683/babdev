import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  BackGroundPositionXEnum,
  BackGroundPositionYEnum,
  HorizontalContentAlignmentEnum
} from '../../enums';
import { BgModel } from '../../models';

@Component({
  selector: 'babdev-bg',
  styleUrls: ['./bg.component.scss'],
  templateUrl: './bg.component.html'
})
export class BgComponent implements OnChanges {
  @Input() public data: BgModel;
  @Input() public horizontalContentAlignment: HorizontalContentAlignmentEnum =
    HorizontalContentAlignmentEnum.CENTER;

  public path: string;
  public positionX: BackGroundPositionXEnum | string;
  public positionY: BackGroundPositionYEnum | string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      const {
        path,
        positionX = BackGroundPositionXEnum.CENTER,
        positionY = 0
      } = this.data;

      this.path = path;
      this.positionX =
        typeof positionX === 'number' ? `${positionX}%` : positionX;
      this.positionY =
        typeof positionY === 'number' ? `${positionY}%` : positionY;
    }
  }
}
