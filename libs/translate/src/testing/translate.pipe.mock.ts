import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';

@Pipe({
  name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
  public transform(key: string): any {
    return of(key);
  }
}
