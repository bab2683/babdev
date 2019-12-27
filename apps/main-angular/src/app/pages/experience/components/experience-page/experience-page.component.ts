import { Component, OnInit } from '@angular/core';

import { RequestService } from '@babdev/request';
import { DictionaryLoader, TranslateService } from '@babdev/translate';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { averageDaysPerMonth, daysFromMS } from '@constants';
import { CV, Duration, Technologies } from '@models';

@Component({
  selector: 'babdev-experience-page',
  templateUrl: './experience-page.component.html',
  styleUrls: ['./experience-page.component.scss']
})
export class ExperiencePageComponent implements OnInit {
  public CV$: Observable<CV>;
  public technologies: Technologies;

  public bgPath: string = 'bg/experience';
  private dictionary: DictionaryLoader = { location: '/pages/experience/', name: 'experience' };

  constructor(private translateService: TranslateService, private req: RequestService) {}

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
        map(({ data }) => data),
        map<CV, CV>(result => {
          result.sections.experiences.items.forEach(exp => {
            exp.dates.start = new Date(exp.dates.start);
            if (exp.dates.end) {
              exp.current = false;
              exp.dates.end = new Date(exp.dates.end);
            } else {
              exp.current = true;
              exp.dates.end = new Date();
            }
            exp.duration = this.calculateDuration(exp.dates.start, exp.dates.end);
          });
          return result;
        })
      );
  }

  private calculateDuration(start: Date, end: Date): Duration {
    const days: number = Math.floor((end.getTime() - start.getTime()) / daysFromMS);

    if (days > 365) {
      const years: number = Math.floor(days / 365);

      return {
        months: Math.floor((days - years * 365) / averageDaysPerMonth),
        years
      };
    } else {
      return {
        months: Math.floor(days / averageDaysPerMonth),
        years: null
      };
    }
  }
}
