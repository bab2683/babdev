import { InjectionToken } from '@angular/core';

import { TranslateConfig } from './translate.config';

export const TranslateInjector = new InjectionToken<TranslateConfig>('TranslateConfig');
