import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'babdev-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @HostBinding('class.with-hover')
  @Input()
  public withHover: boolean;
}
