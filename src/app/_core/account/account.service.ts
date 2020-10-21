import { Injectable } from '@angular/core';
import { ApiService } from '../../_api/api.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { OAuthAuthenticateResponse, User } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private jwt0: string;
  private user0: User;
  private expire: number;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {
    const jwt = sessionStorage.getItem('access_token');
    if (jwt) {
      this.jwt = jwt;
    } else {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const jwtDecode: { exp: number } = jwt_decode(refreshToken);
        if ((jwtDecode.exp - 60 * 60 * 24 /*one day*/) <= (Date.now() / 1000)) {
          this.logout();
        } else {
          this.refreshAccessToken().subscribe(
            () => console.log('Successfully updated access token.'),
            () => this.logout()
          );
        }
      }
    }
  }

  get user(): User {
    return this.user0;
  }

  get jwt(): string {
    return this.jwt0;
  }

  set jwt(jwt: string) {
    const data: User & { exp: number } = jwt_decode(jwt);
    this.jwt0 = jwt;
    this.user0 = data;
    this.expire = data.exp;

    sessionStorage.setItem('access_token', jwt);
  }

  get expired(): boolean {
    return this.expire && this.expire <= Date.now() / 1000;
  }

  public authenticate(code: string): Observable<HttpResponse<OAuthAuthenticateResponse>> {
    return this.apiService.endpoint<OAuthAuthenticateResponse>('authentication/oauth/callback', { code })
      .pipe(tap(data => {
        localStorage.setItem('refresh_token', data.body.refresh_token);
        this.jwt = data.body.access_token;
      }));
  }

  public refreshAccessToken(): Observable<HttpResponse<{ access_token: string }>> {
    const refreshToken: string = localStorage.getItem('refresh_token');
    return this.apiService.endpoint<{ access_token: string }>('authentication/token/refresh', { refresh_token: refreshToken })
      .pipe(tap(data => this.jwt = data.body.access_token));
  }

  public logout(): void {
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.jwt0 = undefined;
    this.user0 = undefined;
    this.expire = undefined;

    // @ts-ignore
    this.router.navigate([ '/login' ]).then(console.log('See you later!'));
  }
}
