import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { interval, Observable, Subject } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly WIDTH = 600;
  private static readonly HEIGHT = 700;

  private authenticating?: Subject<void>;

  public authenticate(): Observable<void> {
    if (this.authenticating) {
      return this.authenticating;
    }

    this.authenticating = new Subject();
    console.log('Trying to authenticate...');

    const x = screen.width / 2 - AuthService.WIDTH / 2 + (window.screenLeft || window.screenX || 0);
    const y = screen.height / 2 - AuthService.HEIGHT / 2 + (window.screenTop || window.screenY || 0);

    const popup = window.open(`${environment.api}/oauth2/authorization/cryptic-oauth`, '_blank',
      `width=${AuthService.WIDTH},height=${AuthService.HEIGHT},left=${x},top=${y}`);

    return interval(500)
      .pipe(filter(_ => popup!.closed), take(1), tap(_ => this.authenticating?.next()), map(_ => undefined));
  }
}
