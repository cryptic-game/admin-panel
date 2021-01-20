import { Component } from '@angular/core';
import { SlideOutDelegate } from '../../../_core/navigation/slide-out/slide-out-delegate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TeamService } from '../../../_api/team/team.service';
import { TeamDepartment, TeamMember } from '../../../_api/team/team';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'admin-team-slide-out-edit-member',
  templateUrl: './team-slide-out-edit-member.component.html',
  styleUrls: [ './team-slide-out-edit-member.component.scss' ]
})
export class TeamSlideOutEditMemberComponent extends SlideOutDelegate {

  form: FormGroup;
  member: TeamMember;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly teamService: TeamService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super('Edit Member');
    this.activatedRoute.queryParams.subscribe(params => this.load(params.edit));
  }

  load(id: string): void {
    this.member = this.teamService.getMember(id);
    this.loadGitHubName(this.member.github_id).subscribe(name => this.form.controls.githubName.setValue(name));

    this.form = this.formBuilder.group({
      name: [ this.member.name, Validators.required ],
      githubName: { value: '', disabled: true },
      departmentId: [ this.member.department_id, Validators.required ],
      departmentName: [ this.teamService.getDepartment(this.member.department_id).name, Validators.required ],
      joined: [ new Date(this.member.joined * 1000).toISOString().split('T')[0], Validators.required ]
    });
  }

  get departments(): TeamDepartment[] {
    return this.teamService.departments;
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    this.member.name = this.form.controls.name.value;
    this.member.department_id = this.form.controls.departmentId.value;
    this.member.joined = Math.floor(new Date(this.form.controls.joined.value).getTime() / 1000);

    this.teamService.updateMember(this.member);
    this.form.reset();
    this.member = undefined;

    this.close();
  }

  private loadGitHubName(id: number): Observable<string> {
    return this.httpClient.get<{ login: string, name?: string }>(`https://api.github.com/user/${id}`)
      .pipe(
        map(data => data.name || data.login),
        catchError(error => {
          console.log(error);
          return of(undefined);
        })
      );
  }
}
