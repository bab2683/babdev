import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ClickableActions } from '@babdev/layout';

import { ContactLinks } from '@constants';
import { ContactLinkTypeEnum } from '@enums';
import { ContactsLink, PageData } from '@models';
import { AppState, getRouteData } from '@store';

@Component({
  selector: 'babdev-contacts-page',
  styleUrls: ['./contacts-page.component.scss'],
  templateUrl: './contacts-page.component.html'
})
export class ContactsPageComponent implements OnInit {
  public actions = ClickableActions;
  public links: ContactsLink[] = ContactLinks;
  public itemType = ContactLinkTypeEnum;

  public pageData$: Observable<PageData>;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.pageData$ = this.store.pipe(select(getRouteData));
  }
}
