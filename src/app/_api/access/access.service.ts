import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {AdminGroup, AdminUser} from './access';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  groups?: AdminGroup[];
  users?: AdminUser[];

  constructor(
    private readonly apiService: ApiService,
    private readonly httpClient: HttpClient
  ) {
    this.updateCache().then();
  }

  public getGroup(groupId: string): AdminGroup | undefined {
    return this.groups?.find(group => group.id === groupId);
  }

  public async deleteUser(userId: number): Promise<string | undefined> {
    try {
      await this.apiService.endpoint('authentication/user/delete', {id: userId});
    } catch (e) {
      throw e.error.error;
    }

    let name;
    this.users = this.users?.filter(user => {
      if (user.id !== userId) {
        return true;
      }
      name = user.name;
      return false;
    });

    return name;
  }

  private async updateCache(): Promise<void> {
    const data = await Promise.all([
      this.apiService.endpoint<AdminGroup[]>('authentication/group/list'),
      this.apiService.endpoint<AdminUser[]>('authentication/user/list')
    ]);

    this.groups = data[0].body || undefined;
    this.users = data[1].body || undefined;

    if (this.users) {
      for (const user of this.users) {
        const github = await this.fetchUserInfo(user);
        if (github) {
          user.name = github.name;
          user.avatar_url = github.avatar_url;
        }
      }
    }
  }

  private async fetchUserInfo(user: AdminUser): Promise<{ name: string; avatar_url: string } | undefined> {
    try {
      const data = await this.httpClient.get<{ login: string; name?: string; avatar_url: string }>
      (`https://api.github.com/user/${user.id}`).toPromise();
      return {name: data.name || data.login, avatar_url: data.avatar_url};
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
