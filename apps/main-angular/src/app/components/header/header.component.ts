import { Component, Input } from '@angular/core';

import { headerBgAnimation } from '@animations';
import { PageData } from '@models';

@Component({
  animations: [headerBgAnimation],
  selector: 'babdev-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() public isHome: boolean;
  @Input() public pageData: PageData;
  @Input() public navigationId: number;
}
