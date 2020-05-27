import { Page } from '@models';
import { capitalize } from './string.utils';

export const generatePageModel = ({
  name,
  hasBg,
  isHome
}: {
  name: string;
  hasBg: boolean;
  isHome: boolean;
}): Page => ({
  data: {
    ...(hasBg ? { bgPath: `bg/${name}` } : {}),
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
