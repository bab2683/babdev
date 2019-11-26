import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'babdev-button-copy',
  styleUrls: ['./button-copy.component.scss'],
  templateUrl: './button-copy.component.html'
})
export class ButtonCopyComponent {
  public icon: IconDefinition = faCopy;
  public value: string;

  @ViewChild('button', { static: true }) public button: ElementRef;

  public removeFocus(): void {
    this.button.nativeElement.blur();
  }
}
