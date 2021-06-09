import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { take } from 'rxjs/operators';
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
    return this.http.get<TeamDepartment[]>(`${environment.api}/website/department`)
      .pipe(take(1));
  }

  public findDepartment(id: string): Observable<TeamDepartment> {
    return this.http.get<TeamDepartment>(`${environment.api}/website/department/${id}`)
      .pipe(take(1));
  }

  public addDepartment(department: TeamDepartment): Observable<TeamDepartment> {
    return this.http.post<TeamDepartment>(`${environment.api}/website/department`, department, { withCredentials: true })
      .pipe(take(1));
  }

  public updateDepartment(department: TeamDepartment): Observable<TeamDepartment> {
    return this.http.put<TeamDepartment>(`${environment.api}/website/department/${department.id}`, department, { withCredentials: true })
      .pipe(take(1));
  }

  public deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/website/department/${id}`, { withCredentials: true })
      .pipe(take(1));
  }

  public findMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${environment.api}/website/member`)
      .pipe(take(1));
  }

  public findMember(id: string): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${environment.api}/website/member/${id}`)
      .pipe(take(1));
  }

  public addMember(member: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(`${environment.api}/website/member`, member, { withCredentials: true })
      .pipe(take(1));
  }

  public updateMember(member: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(`${environment.api}/website/member/${member.id}`, member, { withCredentials: true })
      .pipe(take(1));
  }

  public deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/website/member/${id}`, { withCredentials: true })
      .pipe(take(1));
  }
}
