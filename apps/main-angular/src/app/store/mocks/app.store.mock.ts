import { AppState } from '../app.store';
import { GLOBAL_FEATURE } from '../features';

export const MockedAppStore: AppState = {
  [GLOBAL_FEATURE]: {
    isMobile: false
  }
};
