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
  pages: Page[] = Object.keys(Pages).reduce((result, current) => {
    if (current !== PageNames.HOME) {
      result.push(Pages[current]);
    }
    return result;
  }, []);
}
