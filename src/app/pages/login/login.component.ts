import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { ApiService } from '../../_api/api.service';
import { AccountService } from '../../_core/account/account.service';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
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
    this.navigationService.setTitle('Login');
    this.navigationService.updateVisibility(false);
    this.navigationService.showSlideout(undefined);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(params => this.return = params.return),
        filter(params => params.code),
        mergeMap(params => {
          if (params.code) {
            this.loading = true;
            return this.accountService.authenticate(params.code);
          }
        })
      )
      .subscribe(
        () => {
          console.log(`Welcome ${this.accountService.user.name}, I see you have found the developer console.`
            + '\nYou have successfully logged in with GitHub.');
          if (this.return) {
            this.router.navigateByUrl('/' + this.return).then();
          }
          this.loading = false;
        },
        error => {
          console.error(error);
          this.error = error.status;
        }
      );
  }

  loginWithGithub(): void {
    let href = `https://github.com/login/oauth/authorize?client_id=${environment.clientId}&redirect_uri=${window.location.protocol}//${window.location.host}/login`;
    if (this.return) {
      href += `?return=${this.return}`;
    }
    window.location.href = href;
  }
}
