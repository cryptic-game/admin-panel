import { Injectable } from '@angular/core';
import { TeamDepartment, TeamMember } from './team.domain';
import { TeamApiService } from './team-api.service';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private departments0?: TeamDepartment[];
  private members0?: TeamMember[];

  constructor(
    private teamApiService: TeamApiService
  ) {
    this.updateCache();
  }

  public get departments(): TeamDepartment[] {
    return this.departments0 || [];
  }

  public get members(): TeamMember[] {
    return this.members0 || [];
  }

  public findDepartment(id: string): TeamDepartment | undefined {
    return this.departments0?.find(department => department.id === id);
  }

  public findMember(id: string): TeamMember | undefined {
    return this.members0?.find(member => member.id === id);
  }

  public addDepartment(department: TeamDepartment): Observable<TeamDepartment> {
    return this.teamApiService.addDepartment(department)
      .pipe(tap(department => this.departments0?.push(department)));
  }

  public addMember(member: TeamMember): Observable<TeamMember> {
    return this.teamApiService.addMember(member)
      .pipe(tap(member => this.members0?.push(member)));
  }

  public updateDepartment(department: TeamDepartment): Observable<TeamDepartment> {
    return this.teamApiService.updateDepartment(department)
      .pipe(tap(department => {
        const localDepartment = this.departments0?.find(d => d.id === department.id);

        if (localDepartment) {
          localDepartment.name = department.name;
          localDepartment.description = department.description;
        }
        else {
          this.departments0?.push(department);
        }
      }));
  }

  public updateMember(member: TeamMember): Observable<TeamMember> {
    return this.teamApiService.updateMember(member)
      .pipe(tap(member => {
        const localMember = this.members0?.find(m => m.id === member.id);

        if (localMember) {
          localMember.name = member.name;
          localMember.departmentId = member.departmentId;
          localMember.githubId = member.githubId;
          localMember.joined = member.joined;
        }
        else {
          this.members0?.push(member);
        }
      }));
  }

  public findGitHubId(name: string): Observable<number> {
    return this.teamApiService.findGitHubId(name);
  }

  public findGitHubName(id: number): Observable<string> {
    return this.teamApiService.findGitHubName(id);
  }

  public updateCache(): void {
    forkJoin({
      departments: this.teamApiService.findDepartments(),
      members: this.teamApiService.findMembers()
    }).subscribe(data => {
      this.departments0 = data.departments;
      this.members0 = data.members;
    });
  }
}
