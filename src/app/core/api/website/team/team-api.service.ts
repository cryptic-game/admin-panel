import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map, take } from 'rxjs/operators';
import { TeamDepartment, TeamMember } from './team.domain';

@Injectable({
  providedIn: 'root'
})
export class TeamApiService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public findDepartments(): Observable<TeamDepartment[]> {
    return this.http.get<TeamDepartment[]>(`${environment.api}/website/team/department`)
      .pipe(take(1));
  }

  public findDepartment(id: string): Observable<TeamDepartment> {
    return this.http.get<TeamDepartment>(`${environment.api}/website/team/department/${id}`)
      .pipe(take(1));
  }

  public addDepartment(department: TeamDepartment): Observable<TeamDepartment> {
    return this.http.post<TeamDepartment>(`${environment.api}/website/team/department`, department, { withCredentials: true })
      .pipe(take(1));
  }

  public updateDepartment(department: TeamDepartment): Observable<TeamDepartment> {
    return this.http.put<TeamDepartment>(`${environment.api}/website/team/department/${department.id}`, department, { withCredentials: true })
      .pipe(take(1));
  }

  public deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/website/team/department/${id}`, { withCredentials: true })
      .pipe(take(1));
  }

  public findMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${environment.api}/website/team`)
      .pipe(take(1));
  }

  public findMember(id: string): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${environment.api}/website/team/${id}`)
      .pipe(take(1));
  }

  public addMember(member: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(`${environment.api}/website/team`, member, { withCredentials: true })
      .pipe(take(1));
  }

  public updateMember(member: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(`${environment.api}/website/team/${member.id}`, member, { withCredentials: true })
      .pipe(take(1));
  }

  public deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/website/team/${id}`, { withCredentials: true })
      .pipe(take(1));
  }

  public findGitHubId(name: string): Observable<number> {
    return this.http.get<{ id: number }>(`https://api.github.com/users/${name}`)
      .pipe(map(({ id }) => id), take(1));
  }

  public findGitHubName(id: number): Observable<string> {
    return this.http.get<{ login: string/*, name: string*/ }>(`https://api.github.com/user/${id}`)
      .pipe(map(({ login/*, name*/ }) => /*name ||*/ login), take(1));
  }
}
