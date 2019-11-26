import { Component, Input, OnInit } from '@angular/core';

import { BackGroundPositionXEnum, BackGroundPositionYEnum } from '../../enum';

@Component({
  selector: 'babdev-page-with-bg',
  templateUrl: './page-with-bg.component.html',
  styleUrls: ['./page-with-bg.component.scss']
})
export class PageWithBgComponent implements OnInit {
  @Input() public assetsPath: string = 'assets/';
  @Input() public isMobile: boolean = false;
  @Input() public bgPath: string;
  @Input() public bgPositionX: BackGroundPositionXEnum | number = BackGroundPositionXEnum.CENTER;
  @Input() public bgPositionY: BackGroundPositionYEnum | number = 0;
  @Input() public format: string = 'jpg';

  public path: string;
  public positionX: BackGroundPositionXEnum | string;
  public positionY: BackGroundPositionXEnum | string;

  public ngOnInit(): void {
    this.path = `/${this.assetsPath}${this.bgPath}.${this.format}`;
    this.positionX =
      typeof this.bgPositionX === 'number' ? `${this.bgPositionX}%` : this.bgPositionX;
    this.positionY =
      typeof this.bgPositionY === 'number' ? `${this.bgPositionY}%` : this.bgPositionY;
  }
}
