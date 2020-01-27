import { Component, OnInit } from '@angular/core';
import { BackGroundPositionYEnum, ClickableActions } from '@babdev/layout';
import { DictionaryLoader, TranslateService } from '@babdev/translate';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  private dictionary: DictionaryLoader = { location: '/pages/contacts/', name: 'contacts' };

  constructor(private translateService: TranslateService, private store: Store<AppState>) {}

  ngOnInit() {
    this.translateService.loadDictionary(this.dictionary);
    this.isMobile$ = this.store.pipe(select(getIsMobileState));
  }
}
