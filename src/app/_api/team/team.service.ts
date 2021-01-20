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
    this.apiService.endpoint<TeamMember>('website/team/member/add', {
      name,
      github_id: githubId,
      department_id: departmentId,
      joined: Math.floor(joined.getTime() / 1000)
    }).subscribe(data => this.members.push(data.body));
  }

  public getMember(id: string): TeamMember {
    const member = this.members?.find(m => m.id === id);
    if (!member) {
      this.updateCache(); // TODO: await
      return this.members?.find(m => m.id === id);
    }
    return member;
  }

  public updateMember(member: TeamMember): void {
    this.apiService.endpoint<TeamMember>('website/team/member/update', {
      id: member.id,
      name: member.name,
      github_id: member.github_id,
      department_id: member.department_id,
      joined: member.joined
    }).subscribe(m => {
      const updateMember = this.getMember(member.id);
      updateMember.name = m.body.name;
      updateMember.department_id = m.body.department_id;
      updateMember.joined = Math.floor(new Date(m.body.joined).getTime() / 1000);
    });
  }

  private updateCache(): void {
    forkJoin({
      departments: this.apiService.endpoint<TeamDepartment[]>('website/team/department/list'),
      members: this.apiService.endpoint<TeamMember[]>('website/team/member/list')
    }).subscribe(data => {
      this.departments = data.departments.body;
      this.members = data.members.body;
    }, error => console.error(error));
  }
}
