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

  constructor(private apiService: ApiService) {
    this.updateCache();
  }

  public getDepartment(departmentId: string): TeamDepartment {
    return !this.departments ? null : this.departments.find(department => department.id === departmentId);
  }

  private updateCache(): void {
    forkJoin({
      departments: this.apiService.endpoint<TeamDepartment[]>('team/department/get'),
      members: this.apiService.endpoint<TeamMember[]>('team/member/get')
    }).subscribe(data => {
      this.departments = data.departments.body.data;
      this.members = data.members.body.data;
    }, error => console.error(error));
  }
}
