import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login-pages',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private router: Router) {

  }

  public doLoginAuth(): void {
    this.router.navigate(['greenstarui/pages/dashboard']);
  }

}
