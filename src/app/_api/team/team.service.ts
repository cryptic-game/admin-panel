import { Injectable } from '@angular/core';
import { TeamDepartment, TeamMember } from './team';
import { forkJoin } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  departments: TeamDepartment[];
  members: TeamMember[];

  constructor(
    private readonly apiService: ApiService
  ) {
    this.updateCache();
  }

  public getDepartment(departmentId: string): TeamDepartment {
    return !this.departments ? null : this.departments.find(department => department.id === departmentId);
  }

  public addMember(name: string, githubId: number, joined: number): void {
    this.apiService.endpoint<TeamMember>('team/member/add', { name, github_id: githubId, joined })
      .subscribe(data => this.members.push(data.body));
  }

  private updateCache(): void {
    forkJoin({
      departments: this.apiService.endpoint<TeamDepartment[]>('team/department/list'),
      members: this.apiService.endpoint<TeamMember[]>('team/member/list')
    }).subscribe(data => {
      this.departments = data.departments.body;
      this.members = data.members.body;
    }, error => console.error(error));
  }
}
