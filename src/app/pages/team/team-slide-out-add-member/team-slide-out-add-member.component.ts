import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval} from 'rxjs';
import {debounce, filter, mergeMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../../_api/team/team.service';
import {TeamDepartment} from '../../../_api/team/team';
import {SlideOutDelegate} from '../../../_core/navigation/slide-out/slide-out-delegate';

@Component({
  selector: 'app-team-slide-out-add-member',
  templateUrl: './team-slide-out-add-member.component.html',
  styleUrls: ['./team-slide-out-add-member.component.scss']
})
export class TeamSlideOutAddMemberComponent extends SlideOutDelegate {

  form: FormGroup;
  githubId = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly teamService: TeamService
  ) {
    super('Add Member');
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      githubName: ['', Validators.required],
      departmentId: ['', Validators.required],
      departmentName: ['', Validators.required],
      joined: ['', Validators.required]
    });

    this.form.controls.githubName.valueChanges
    .pipe(
      filter(value => !!value),
      debounce(() => interval(1000)),
      mergeMap(value => this.loadGitHubId(value))
    )
    .subscribe(id => this.githubId = id);
  }

  get departments(): TeamDepartment[] | undefined {
    return this.teamService.departments;
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    const value: { name: string; departmentId: string; joined: string } = this.form.value;
    this.teamService.addMember(value.name, this.githubId, value.departmentId, new Date(value.joined));
    this.form.reset();
    this.githubId = 0;

    this.close();
  }

  private async loadGitHubId(username: string): Promise<number> {
    try {
      return (await this.httpClient.get<{ id: number }>(`https://api.github.com/users/${username}`).toPromise()).id;
    } catch (e) {
      console.log(e);
      return -1;
    }
  }
}
