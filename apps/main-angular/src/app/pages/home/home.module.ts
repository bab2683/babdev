import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@babdev/translate';

import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
        // data: { name: 'home' }
      }
    ]),
    TranslateModule
  ]
})
export class HomeModule {}
