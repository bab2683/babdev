import { ClickableActions } from '../enums';

export interface ClickableOptionModel {
  [name: string]: string;
}

export interface ClickableActionFormat {
  data?: ClickableOptionModel;
  type: ClickableActions;
}
