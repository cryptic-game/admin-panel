import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../_core/navigation/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, mergeMap, tap} from 'rxjs/operators';
import {ApiService} from '../../_api/api.service';
import {AccountService} from '../../_core/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean;
  error: string;
  return: string;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly accountService: AccountService,
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {
    this.navigationService.init('Login', true);
    this.navigationService.showSlideOut(undefined);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      tap((params) => (this.return = params.return)),
      filter((params) => params.code),
      mergeMap((params) => {
        if (params.code) {
          this.loading = true;
          return this.accountService.authenticate(params.code);
        }
      })
    )
    .subscribe(
      () => {
        // ${this.accountService.user.name}
        console.log(
          `Welcome, I see you have found the developer console.` +
          '\nYou have successfully logged in with GitHub.'
        );
        if (this.return) {
          this.router.navigate(this.return.split('/')).then();
        } else {
          this.router.navigate(['dashboard']).then();
        }
        this.loading = false;
      },
      (error) => {
        console.warn(error);
        this.error = error.status;
        this.loading = false;
      }
    );
  }

  loginWithGithub(): void {
    this.apiService
    .endpoint<{ client_id: string }>('authentication/oauth/client_id')
    .subscribe((data) => {
      if (!data.body) {
        return;
      }

      let href = 'https://github.com/login/oauth/authorize'
        + `?client_id=${data.body.client_id}`
        + `&redirect_uri=${window.location.protocol}//${window.location.host}/login`;
      if (this.return) {
        href += `?return=${this.return}`;
      }
      window.location.href = href;
    });
  }
}
