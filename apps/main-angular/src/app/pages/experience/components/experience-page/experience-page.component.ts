import { Component, OnInit } from '@angular/core';
import { Technologies } from '@babdev/layout';
import { RequestService } from '@babdev/request';
import { DictionaryLoader, TranslateService } from '@babdev/translate';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CV } from '@models';
import { AppState, getIsMobileState } from '@store';
import { parseCVDates } from '@utils';

@Component({
  selector: 'babdev-experience-page',
  templateUrl: './experience-page.component.html',
  styleUrls: ['./experience-page.component.scss']
})
export class ExperiencePageComponent implements OnInit {
  public CV$: Observable<CV>;
  public isMobile$: Observable<boolean>;
  public technologies: Technologies;

  public bgPath: string = 'bg/experience';
  private dictionary: DictionaryLoader = { location: '/pages/experience/', name: 'experience' };

  constructor(
    private translateService: TranslateService,
    private req: RequestService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.translateService.loadDictionary(this.dictionary);

    this.req
      .get<Technologies>({ cache: true, url: 'assets/data/technologies.json' })
      .pipe(take(1))
      .subscribe(({ data }) => (this.technologies = data));

    this.CV$ = this.req
      .get<CV>({
        cache: true,
        url: 'assets/data/cv.json'
      })
      .pipe(
        take(1),
        map(({ data }) => data),
        map<CV, CV>(parseCVDates)
      );

    this.isMobile$ = this.store.pipe(select(getIsMobileState));
  }
}
