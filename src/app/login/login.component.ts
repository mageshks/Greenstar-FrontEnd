import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { IUser } from './user.interface';

@Component({
  selector: 'ngx-login-pages',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isShowErrorMsg: boolean = false;
  public isSpinner: boolean = false;

  public ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService) {
  }

  public doLoginAuth(): void {

    this.isShowErrorMsg = false;
    if (this.loginForm.valid) {

      this.isSpinner = true;
      const formData: FormData = new FormData();
      formData.append('userId', this.loginForm.getRawValue().userId);
      formData.append('password', this.loginForm.getRawValue().password);

      this.loginService.userLogin(formData).subscribe(
        (response) => {

          if (response !== null && response !== '') {
            let menuNames = null;
            if (response.roleName === 'Admin') {
              menuNames = 'Dashboard~School~Student~Performance Data~Performance Star~Performance Metrics~Admin';
            } else if (response.roleName === 'Event POC') {
              menuNames = 'Dashboard~School~Student';
            } else if (response.roleName === 'PMO') {
              menuNames = 'Dashboard~School~Student~~Performance Data~Performance Star';
            } else {
              console.log('No matches found');
            }

            localStorage.setItem('roleName', response.roleName);
            localStorage.setItem('apiToken', response.apiToken);
            // localStorage.setItem('uiMenuList', JSON.stringify(response.uiMenuList));
            localStorage.setItem('uiMenuList', menuNames);
            localStorage.setItem('userId', this.loginForm.getRawValue().userId);

            this.router.navigate(['greenstarui/pages/dashboard']);
          } else {
            this.isSpinner = false;
            this.isShowErrorMsg = true;
          }
        },
        error => {
          this.isSpinner = false;
          this.isShowErrorMsg = true;
          console.log("Http Server error", error);
        }
      );
    } else {
      this.isSpinner = false;
      this.isShowErrorMsg = true;
    }

  }

}
