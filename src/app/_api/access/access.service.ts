import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { AdminGroup, AdminUser } from './access';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  groups: AdminGroup[];
  users: AdminUser[];

  constructor(
    private readonly apiService: ApiService,
    private readonly httpClient: HttpClient
  ) {
    this.updateCache();
  }

  public getGroup(groupId: string): AdminGroup {
    return !this.groups ? null : this.groups.find(group => group.id === groupId);
  }

  private updateCache(): void {
    forkJoin({
      groups: this.apiService.endpoint<AdminGroup[]>('authentication/group/list'),
      users: this.apiService.endpoint<AdminUser[]>('authentication/user/list')
    }).subscribe(data => {
      this.groups = data.groups.body;
      this.users = data.users.body;
      this.users.forEach(user => this.fetchUserInfo(user).subscribe(info => {
        user.name = info.name;
        user.avatar_url = info.avatar_url;
      }));
    }, error => console.error(error));
  }

  private fetchUserInfo(user: AdminUser): Observable<{ name: string, avatar_url: string }> {
    return this.httpClient.get<{ login: string, name?: string, avatar_url: string }>(`https://api.github.com/user/${user.id}`)
      .pipe(
        map(data => ({ name: data.name || data.login, avatar_url: data.avatar_url })),
        catchError(error => {
          console.log(error);
          return of(undefined);
        })
      );
  }

  public deleteUser(userId: number): Observable<string> {
    return this.apiService.endpoint<void>('authentication/user/delete', { id: userId })
      .pipe(
        map(() => {
          this.users = this.users.filter(user => user.id !== userId);
          return undefined;
        }),
        catchError(error => of(error.error.error))
      );
  }
}
