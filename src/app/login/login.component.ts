import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

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
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      userId: ['panneer', Validators.required],
      password: ['panneer', Validators.required]
    });
  }

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService) {
  }

  public doLoginAuth(): void {

    localStorage.clear();
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
              menuNames = 'Dashboard~School~Student~Performance Data~Performance Star~Performance Metrics~Admin~Logout';
            } else if (response.roleName === 'PMO') {
              menuNames = 'Dashboard~School~Student~Performance Data~Performance Star~Performance Metrics~Logout';
            } else if (response.roleName === 'Event POC') {
              menuNames = 'School~Student~Performance Data~Performance Star~Performance Metrics~Logout';
            } else {
              console.log('No matches found');
            }
            console.log('roleName', response.roleName);
            console.log('apiToken', response.apiToken);
            console.log('uiMenuList', menuNames);
            localStorage.setItem('roleName', response.roleName);
            localStorage.setItem('apiToken', response.apiToken);
            // localStorage.setItem('uiMenuList', JSON.stringify(response.uiMenuList));
            localStorage.setItem('uiMenuList', menuNames);
            localStorage.setItem('userId', this.loginForm.getRawValue().userId);

            if (response.roleName === 'Event POC') {
              this.router.navigate(['greenstarui/pages/school']);
            } else {
              this.router.navigate(['greenstarui/pages/dashboard']);
            }
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
