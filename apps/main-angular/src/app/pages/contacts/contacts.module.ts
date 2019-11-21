import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@babdev/translate';

import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';

@NgModule({
  declarations: [ContactsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsPageComponent
        // data: { name: 'contacts' }
      }
    ]),
    TranslateModule
  ]
})
export class ContactsModule {}
