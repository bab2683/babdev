import { Component } from '@angular/core';

import { Pages } from '@constants';
import { PageNames } from '@enums';
import { Page } from '@models';

@Component({
  selector: 'babdev-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent {
  public pages: Page[] = Pages.filter(
    ({ data: { name } }) => name !== PageNames.HOME
  );
}
