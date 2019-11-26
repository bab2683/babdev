import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  NgModuleRef,
  ViewContainerRef
} from '@angular/core';

import { TooltipComponent } from '../../components';
import { DynamicComponentService } from '../../services';

@Directive({
  selector: '[babdevCopy]'
})
export class CopyDirective {
  @Input() public valueToCopy: string;
  private tooltipComponent: TooltipComponent;

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private viewContainerRef: ViewContainerRef,
    private dynamicComponentService: DynamicComponentService,
    private moduleRef: NgModuleRef<any>
  ) {
    this.tooltipComponent = this.dynamicComponentService.addComponentToRef(
      TooltipComponent,
      this.viewContainerRef,
      { key: 'common.COPIED_TO_CLIPBOARD' },
      this.moduleRef
    ).instance;
  }

  @HostListener('click') public onClick(): void {
    this.copyToClipboard();
  }

  public copyToClipboard(customValue?: string): void {
    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData;
      if (clipboard) {
        let valueToCopy: string;

        if (customValue) {
          valueToCopy = customValue;
        } else if (this.valueToCopy) {
          valueToCopy = this.valueToCopy;
        } else {
          valueToCopy = this.el.nativeElement.innerText;
        }
        clipboard.setData('text', valueToCopy);
        e.preventDefault();
        this.tooltipComponent.show(1250);
      }
    };

    this.document.addEventListener('copy', listener, false);
    this.document.execCommand('copy');
    this.document.removeEventListener('copy', listener, false);
  }
}
