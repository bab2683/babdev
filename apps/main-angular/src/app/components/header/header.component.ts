import { Component, Input } from '@angular/core';

import { HorizontalContentAlignmentEnum } from '@babdev/layout';

import { PageData } from '@models';

@Component({
  selector: 'babdev-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() public isHome: boolean;
  @Input() public pageData: PageData;
  public alignment = HorizontalContentAlignmentEnum;
}
