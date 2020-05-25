import { Routes } from '@angular/router';

import { Pages } from '@constants';

export const routes: Routes = Object.keys(Pages).map((page) => {
  const { moduleName, name, path } = Pages[page];
  return {
    data: { name },
    loadChildren: () =>
      import(`./${name}/${name}.module`).then((mode) => mode[moduleName]),
    path
  };
});
