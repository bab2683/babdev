import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TranslateModule } from '@babdev/translate';

import {
  BgComponent,
  ButtonCopyComponent,
  ButtonHyperlinkComponent,
  ButtonMailComponent,
  CardComponent,
  LinkOrTextComponent,
  PageWithBgComponent,
  TooltipComponent
} from './components';
import { ClickableDirective, CopyDirective } from './directives';

@NgModule({
  declarations: [
    BgComponent,
    ButtonCopyComponent,
    ButtonHyperlinkComponent,
    ButtonMailComponent,
    CardComponent,
    ClickableDirective,
    CopyDirective,
    LinkOrTextComponent,
    PageWithBgComponent,
    TooltipComponent
  ],
  entryComponents: [
    ButtonCopyComponent,
    ButtonHyperlinkComponent,
    ButtonMailComponent,
    TooltipComponent
  ],
  exports: [
    BgComponent,
    CardComponent,
    ClickableDirective,
    CopyDirective,
    LinkOrTextComponent,
    PageWithBgComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatCardModule,
    MatTooltipModule,
    TranslateModule
  ]
})
export class LayoutModule {}
