import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'main-angular';

  constructor() {
    console.log('environment', environment);
  }
}
