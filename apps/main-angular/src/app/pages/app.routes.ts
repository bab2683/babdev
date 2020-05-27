import { Routes } from '@angular/router';

import { Pages } from '@constants';

export const routes: Routes = Pages.map(({ data, moduleName, path }) => ({
  data,
  loadChildren: () =>
    import(`./${data.name}/${data.name}.module`).then(
      (mode) => mode[moduleName]
    ),
  path
}));
