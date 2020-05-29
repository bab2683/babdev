import { BgModel } from '@babdev/layout';

import { Page } from '@models';
import { capitalize } from './string.utils';

export const generatePageModel = ({
  bgData,
  isHome,
  name
}: {
  bgData?: BgModel;
  isHome: boolean;
  name: string;
}): Page => ({
  data: {
    ...(bgData ? { bgData } : {}),
    dictionary: {
      location: `/pages/${name}/`,
      name
    },
    name,
    titleKey: `common.PAGES.${name.toUpperCase()}`
  },
  moduleName: `${capitalize(name)}Module`,
  path: isHome ? '' : name
});
