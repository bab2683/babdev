import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@babdev/translate';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  ButtonCopyComponent,
  ButtonHyperlinkComponent,
  ButtonMailComponent,
  PageWithBgComponent,
  TooltipComponent
} from './components';
import { ClickableDirective, CopyDirective } from './directives';

@NgModule({
  declarations: [
    ClickableDirective,
    PageWithBgComponent,
    ButtonHyperlinkComponent,
    ButtonCopyComponent,
    ButtonMailComponent,
    TooltipComponent,
    CopyDirective
  ],
  entryComponents: [
    ButtonHyperlinkComponent,
    ButtonCopyComponent,
    ButtonMailComponent,
    TooltipComponent
  ],
  exports: [ClickableDirective, CopyDirective, PageWithBgComponent],
  imports: [CommonModule, FontAwesomeModule, MatTooltipModule, TranslateModule]
})
export class LayoutModule {}
