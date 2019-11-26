import { ClickableActionFormat } from '@babdev/layout';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { ContactLinkIdEnum, ContactLinkTypeEnum } from '@enums';

export interface ContactsLink {
  alt?: string;
  actions: ClickableActionFormat[];
  icon?: IconDefinition;
  id: ContactLinkIdEnum;
  text?: string;
  type: ContactLinkTypeEnum;
}
