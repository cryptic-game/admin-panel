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

  public addMember(name: string, githubId: number, departmentId: string, joined: Date): void {
    this.apiService.endpoint<TeamMember>('team/member/add', {
      name,
      github_id: githubId,
      department_id: departmentId,
      joined: Math.floor(joined.getTime() / 1000)
    }).subscribe(data => this.members.push(data.body));
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
