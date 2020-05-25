import { AppState } from '../app.store';
import { GLOBAL_FEATURE, ROUTER_FEATURE } from '../features';

export const MockedAppStore: AppState = {
  [GLOBAL_FEATURE]: {
    isHomePage: true,
    isMobile: false
  },
  [ROUTER_FEATURE]: {} as any
};
