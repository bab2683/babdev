import { ClickableActions } from '../enum';

export interface ClickableOptionModel {
  [name: string]: string;
}

export interface ClickableActionFormat {
  data?: ClickableOptionModel;
  type: ClickableActions;
}
