import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(environment.api)) {
      return next.handle(request);
    }

    return next.handle(request)
      .pipe(catchError(event =>
        event instanceof HttpResponseBase && event.status === 401
          ? this.authService.authenticate().pipe(mergeMap(_ => next.handle(request)))
          : throwError(event)
      ));
  }
}
