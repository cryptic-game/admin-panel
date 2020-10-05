import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { debounce, filter, map, mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../../_api/team/team.service';
import { SlideOutDelegate } from '../../../_core/navigation/slide-out/slide-out-delegate';

@Component({
  selector: 'admin-team-slide-out-add-member',
  templateUrl: './team-slide-out-add-member.component.html',
  styleUrls: [ './team-slide-out-add-member.component.scss' ]
})
export class TeamSlideOutAddMemberComponent extends SlideOutDelegate {

  form: FormGroup;
  githubId = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly teamService: TeamService
  ) {
    super();
    this.form = this.formBuilder.group({
      name: [ '', Validators.required ],
      githubName: [ '', Validators.required ],
      joined: [ '', Validators.required ]
    });

    this.form.controls.githubName.valueChanges
      .pipe(
        filter(value => !!value),
        debounce(() => interval(1000)),
        mergeMap(value => this.loadGitHubId(value))
      )
      .subscribe(id => this.githubId = id);
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    const value: { name: string, joined: string } = this.form.value;
    this.teamService.addMember(value.name, this.githubId, new Date(value.joined).getTime());
    this.form.reset();
    this.githubId = 0;

    this.close();
  }

  private loadGitHubId(username: string): Observable<number> {
    return this.httpClient.get<{ id: number }>(`https://api.github.com/users/${username}`)
      .pipe(map(data => data.id));
  }
}
