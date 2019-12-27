import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(mode => mode.ContactsModule),
    data: { name: 'contacts' }
  },
  {
    path: 'experience',
    loadChildren: () =>
      import('./experience/experience.module').then(mode => mode.ExperienceModule),
    data: { name: 'experience' }
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mode => mode.HomeModule),
    data: { name: 'home' }
  }
];
