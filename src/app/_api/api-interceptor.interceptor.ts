import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_core/account/account.service';
import { environment } from '../../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private readonly accountService: AccountService
  ) {
  }

  static updateRequest<T>(request: HttpRequest<T>, accessToken: string): HttpRequest<T> {
    return request.clone({ headers: new HttpHeaders({ authorization: accessToken }) });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.accountService.jwt
      && request.url.startsWith(environment.apiBaseUrl)
      && !(request.url.includes('authentication/oauth/callback') || request.url.includes('authentication/token/refresh'))) {

      if (this.accountService.expired) {
        return this.accountService.refreshAccessToken()
          .pipe(mergeMap(data => next.handle(ApiInterceptorInterceptor.updateRequest(request, data.body.access_token))));
      }

      request = ApiInterceptorInterceptor.updateRequest(request, this.accountService.jwt);
    }
    return next.handle(request);
  }
}
