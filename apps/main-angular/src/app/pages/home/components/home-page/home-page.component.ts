import { Component, OnInit } from '@angular/core';

import { DictionaryLoader, TranslateService } from '@babdev/translate';

@Component({
  selector: 'babdev-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  dictionary: DictionaryLoader = { location: '/pages/home/', name: 'home' };

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.loadDictionary(this.dictionary);
  }
}
