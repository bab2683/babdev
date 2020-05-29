import { Component, Input } from '@angular/core';

import { BgModel } from '../../models';

@Component({
  selector: 'babdev-page-with-bg',
  templateUrl: './page-with-bg.component.html',
  styleUrls: ['./page-with-bg.component.scss']
})
export class PageWithBgComponent {
  @Input() public bgData: BgModel;
  @Input() public title: string;
}
