import {Injectable} from '@angular/core';
import {TeamDepartment, TeamMember} from './team';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {

  departments?: TeamDepartment[];
  members?: TeamMember[];

  constructor(private readonly apiService: ApiService) {
    this.updateCache().then();
  }

  public getDepartment(departmentId: string): TeamDepartment | undefined {
    return this.departments?.find((department) => department.id === departmentId);
  }

  public addMember(name: string, githubId: number, departmentId: string, joined: Date): void {
    this.apiService.endpoint<TeamMember>('website/team/member/add', {
      name, github_id: githubId, department_id: departmentId, joined: Math.floor(joined.getTime() / 1000),
    }).then((data) => {
      if (data.body) {
        this.members?.push(data.body);
      }
    });
  }

  public async getMember(id: string): Promise<TeamMember | undefined> {
    const member = this.members?.find((m) => m.id === id);
    if (!member) {
      await this.updateCache();
      return this.members?.find((m) => m.id === id);
    }
    return member;
  }

  public async updateMember(member: TeamMember): Promise<void> {
    const data = await this.apiService.endpoint<TeamMember>('website/team/member/update', {
      id: member.id,
      name: member.name,
      github_id: member.github_id,
      department_id: member.department_id,
      joined: member.joined,
    });

    if (!data.body) {
      return;
    }

    const updateMember = await this.getMember(member.id);
    if (!updateMember) {
      return;
    }

    updateMember.name = data.body.name;
    updateMember.department_id = data.body.department_id;
    updateMember.joined = Math.floor(new Date(data.body.joined).getTime() / 1000);
  }

  private async updateCache(): Promise<void> {
    try {
      const data = await Promise.all([
        this.apiService.endpoint<TeamDepartment[]>('website/team/department/list'),
        this.apiService.endpoint<TeamMember[]>('website/team/member/list'),
      ]);
      this.departments = data[0].body || undefined;
      this.members = data[1].body || undefined;
    } catch (e) {
      console.error(e);
    }
  }
}
