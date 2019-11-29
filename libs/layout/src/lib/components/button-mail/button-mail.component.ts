import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'babdev-button-mail',
  templateUrl: './button-mail.component.html',
  styleUrls: ['./button-mail.component.scss']
})
export class ButtonMailComponent {
  public icon: IconDefinition = faEnvelope;
  public value: string;
}
