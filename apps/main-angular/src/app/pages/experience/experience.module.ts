import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@babdev/layout';
import { TranslateModule } from '@babdev/translate';

import { ExperiencePageComponent } from './components/experience-page/experience-page.component';

@NgModule({
  declarations: [ExperiencePageComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExperiencePageComponent
      }
    ]),
    TranslateModule
  ]
})
export class ExperienceModule {}
