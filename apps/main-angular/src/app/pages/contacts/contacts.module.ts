import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@babdev/layout';
import { TranslateModule } from '@babdev/translate';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';

@NgModule({
  declarations: [ContactsPageComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    LayoutModule,
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
