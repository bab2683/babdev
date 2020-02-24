import { Component, Input } from '@angular/core';

@Component({
  selector: 'babdev-link-or-text',
  templateUrl: './link-or-text.component.html',
  styleUrls: ['./link-or-text.component.scss']
})
export class LinkOrTextComponent {
  @Input() key: string;
  @Input() source: { [key: string]: { link: string; name: string } };
}
