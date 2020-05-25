import {
  Component,
  Input,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import {
  ButtonCopyComponent,
  ButtonHyperlinkComponent,
  ButtonMailComponent
} from '../../components';
import { ClickableActions } from '../../enums';
import { ClickableActionFormat } from '../../models';
import { DynamicComponentService } from '../../services';

@Component({
  selector: '*[babdevClickable]',
  styleUrls: ['./clickable.directive.scss'],
  templateUrl: './clickable.directive.html',
  encapsulation: ViewEncapsulation.None
})
export class ClickableDirective implements OnInit {
  @Input() public clickableActions: ClickableActionFormat[] = [];

  @ViewChild('test', { read: ViewContainerRef, static: true })
  public test: ViewContainerRef;

  constructor(
    private dynamicComponentService: DynamicComponentService,
    private moduleRef: NgModuleRef<any>
  ) {}

  public ngOnInit(): void {
    if (this.clickableActions.length) {
      this.clickableActions.forEach((action) => {
        this.addComponent(action);
      });
    }
  }

  private addComponent({ type, data }: ClickableActionFormat): void {
    let componentType: any;

    switch (type) {
      case ClickableActions.COPY:
        componentType = ButtonCopyComponent;
        break;

      case ClickableActions.HYPERLINK:
        componentType = ButtonHyperlinkComponent;
        break;

      case ClickableActions.MAIL:
        componentType = ButtonMailComponent;
        break;
    }

    this.dynamicComponentService.addComponentToRef(
      componentType,
      this.test,
      data,
      this.moduleRef
    );
  }
}
