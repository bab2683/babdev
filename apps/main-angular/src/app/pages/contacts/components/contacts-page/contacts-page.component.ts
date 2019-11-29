import { Component, OnInit } from '@angular/core';
import { BackGroundPositionYEnum, ClickableActions } from '@babdev/layout';
import { DictionaryLoader, TranslateService } from '@babdev/translate';

import { ContactLinks } from '@constants';
import { ContactLinkTypeEnum } from '@enums';
import { ContactsLink } from '@models';

@Component({
  selector: 'babdev-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  public actions = ClickableActions;
  public links: ContactsLink[] = ContactLinks;
  public itemType = ContactLinkTypeEnum;
  public bgPath: string = 'bg/contacts';
  public bgPositionY: BackGroundPositionYEnum = BackGroundPositionYEnum.BOTTOM;

  private dictionary: DictionaryLoader = { location: '/pages/contacts/', name: 'contacts' };

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.loadDictionary(this.dictionary);
  }
}
