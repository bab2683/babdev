import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faAngular,
  faAws,
  faGitAlt,
  faGulp,
  faNodeJs,
  faReact,
  faSass,
  faWordpress,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { IconTypesEnum } from '../enums';

export const TechIcons: { [type: string]: { [key: string]: IconDefinition } } = {
  [IconTypesEnum.FAB]: {
    NG: faAngular,
    REACT: faReact,
    NODE: faNodeJs,
    WP: faWordpress,
    SASS: faSass,
    GULP: faGulp,
    GIT: faGitAlt,
    YOUTUBE: faYoutube,
    AWSP: faAws
  },
  [IconTypesEnum.FAS]: {
    GMAPS: faMapMarkerAlt
  }
};
