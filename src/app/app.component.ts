import { Component } from '@angular/core';

import { environment } from "@env/environment"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor () {
    console.log('environment', environment);
  }
}
