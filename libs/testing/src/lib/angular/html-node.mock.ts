import { Component } from '@angular/core';

import { htmlTag } from '../web';

@Component({
  template: ''
})
export class HTMLElementMock {
  public nativeElement = htmlTag;
}
