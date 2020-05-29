import { Component, Input } from '@angular/core';

import { Pages } from '@constants';
import { PageNames } from '@enums';
import { Page } from '@models';

@Component({
  selector: 'babdev-page-list',
  styleUrls: ['./page-list.component.scss'],
  templateUrl: './page-list.component.html'
})
export class PageListComponent {
  @Input() public open: boolean = false;

  public pages: Page[] = Pages.filter(
    ({ data: { name } }) => name !== PageNames.HOME
  );
}
