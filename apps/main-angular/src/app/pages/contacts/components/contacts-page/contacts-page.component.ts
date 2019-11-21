import { Component, OnInit } from '@angular/core';
import { DictionaryLoader, TranslateService } from '@babdev/translate';

@Component({
  selector: 'babdev-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  dictionary: DictionaryLoader = { location: '/pages/contacts/', name: 'contacts' };

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.loadDictionary(this.dictionary);
  }
}
