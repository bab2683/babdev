import {
  faFacebookSquare,
  faGithub,
  faGoogle,
  faLinkedin,
  faSkype
} from '@fortawesome/free-brands-svg-icons';

import { ClickableActions } from '@babdev/layout';

import { ContactLinkIdEnum, ContactLinkTypeEnum } from '@enums';
import { ContactsLink } from '@models';

export const ContactLinks: ContactsLink[] = [
  {
    actions: [
      {
        type: ClickableActions.HYPERLINK,
        data: {
          value: 'https://www.linkedin.com/in/bab2683-braulio-barahona/'
        }
      }
    ],
    icon: faLinkedin,
    id: ContactLinkIdEnum.LINKEDIN,
    text: 'linkedin.com/in/bab2683-braulio-barahona/',
    type: ContactLinkTypeEnum.URL
  },
  {
    actions: [
      {
        type: ClickableActions.HYPERLINK,
        data: {
          value: 'https://github.com/bab2683'
        }
      }
    ],
    icon: faGithub,
    id: ContactLinkIdEnum.GITHUB,
    text: 'github.com/bab2683',
    type: ContactLinkTypeEnum.URL
  },
  {
    actions: [
      {
        type: ClickableActions.HYPERLINK,
        data: {
          value: 'https://www.facebook.com/bab2683'
        }
      }
    ],
    icon: faFacebookSquare,
    id: ContactLinkIdEnum.FACEBOOK,
    text: 'facebook.com/bab2683',
    type: ContactLinkTypeEnum.URL
  },
  {
    actions: [
      {
        type: ClickableActions.COPY,
        data: {
          tooltipKey: 'common.COPIED_TO_CLIPBOARD',
          value: 'barahona.braulio@gmail.com'
        }
      },
      {
        type: ClickableActions.MAIL,
        data: {
          value: 'barahona.braulio@gmail.com'
        }
      }
    ],
    icon: faGoogle,
    id: ContactLinkIdEnum.GOOGLE,
    text: 'barahona.braulio@gmail.com',
    type: ContactLinkTypeEnum.MAIL
  },
  {
    actions: [
      {
        type: ClickableActions.COPY,
        data: {
          tooltipKey: 'common.COPIED_TO_CLIPBOARD',
          value: 'bab2683'
        }
      }
    ],
    icon: faSkype,
    id: ContactLinkIdEnum.SKYPE,
    text: 'bab2683',
    type: ContactLinkTypeEnum.TEXT
  }
];
