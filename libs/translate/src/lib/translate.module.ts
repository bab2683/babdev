import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TranslateConfig } from './translate.config';
import { TranslateInjector } from './translate.injector';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
  imports: [CommonModule]
})
export class TranslateModule {
  static forRoot(config: TranslateConfig): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [
        TranslateService,
        {
          provide: TranslateInjector,
          useValue: config
        }
      ]
    };
  }
}
