import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'babdev-button-hyperlink',
  templateUrl: './button-hyperlink.component.html',
  styleUrls: ['./button-hyperlink.component.scss']
})
export class ButtonHyperlinkComponent {
  public icon: IconDefinition = faLink;
  public value: string;
}
