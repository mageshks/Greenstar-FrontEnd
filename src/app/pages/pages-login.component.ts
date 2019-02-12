import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-login-layout>
      <router-outlet></router-outlet>
    </ngx-login-layout>
  `,
})
export class PagesLoginComponent {

}
