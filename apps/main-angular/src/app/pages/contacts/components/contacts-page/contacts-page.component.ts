import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BackGroundPositionYEnum, ClickableActions } from '@babdev/layout';

import { ContactLinks } from '@constants';
import { ContactLinkTypeEnum } from '@enums';
import { ContactsLink } from '@models';
import { AppState, getIsMobileState } from '@store';

@Component({
  selector: 'babdev-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  public actions = ClickableActions;
  public links: ContactsLink[] = ContactLinks;
  public itemType = ContactLinkTypeEnum;
  public bgPath: string = 'bg/contacts';
  public bgPositionY: BackGroundPositionYEnum = BackGroundPositionYEnum.BOTTOM;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.isMobile$ = this.store.pipe(select(getIsMobileState));
  }
}
