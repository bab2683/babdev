import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  public subscription: Subscription;

  constructor(private service: TranslateService) {}

  public transform(key: string): any {
    const exploded: string[] = key.split('.');

    return this.service.getKey(exploded);
  }
}
