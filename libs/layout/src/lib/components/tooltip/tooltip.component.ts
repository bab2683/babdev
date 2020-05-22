import { Component, Input, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { TooltipStatus } from '../../enums';

@Component({
  selector: 'babdev-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() public key: string;
  @ViewChild('tooltip') public tooltip: MatTooltip;

  public status: TooltipStatus = TooltipStatus.CLOSED;

  public show(duration?: number): void {
    if (this.status === TooltipStatus.CLOSED) {
      this.tooltip.show();
      this.status = TooltipStatus.OPEN;

      if (duration) {
        setTimeout(() => {
          this.hide();
        }, duration);
      }
    }
  }

  public hide(): void {
    if (this.status === TooltipStatus.OPEN) {
      this.tooltip.hide();
      this.status = TooltipStatus.CLOSED;
    }
  }
}
