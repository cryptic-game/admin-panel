import { FormBuilder, Validators } from '@angular/forms';
import { interval, of, Subscription } from 'rxjs';
import { TeamService } from '../../../../core/api/website/team/team.service';
import { catchError, debounce, filter, switchMap } from 'rxjs/operators';
import { TeamDepartment, TeamMember } from '../../../../core/api/website/team/team.domain';

export abstract class TeamMemberBaseComponent {

  githubId?: number;

  form = this.fb.group({
    name: [ '', Validators.required ],
    githubName: [ '', Validators.required ],
    joined: [ '', Validators.required ],
    departmentId: [ '', Validators.required ]
  });

  protected readonly githubSubscription: Subscription;

  protected constructor(
    private readonly fb: FormBuilder,
    protected readonly teamService: TeamService
  ) {
    this.githubSubscription = this.form.get('githubName')!.valueChanges
      .pipe(
        debounce(() => interval(500)),
        filter(name => {
          if (!name) {
            this.githubId = undefined;
            return false;
          }
          return true;
        }),
        switchMap(name => this.teamService.findGitHubId(name).pipe(catchError(_ => of(undefined))))
      )
      .subscribe(id => this.githubId = id);
  }

  public get image(): string | undefined {
    return !this.githubId ? undefined : `https://avatars.githubusercontent.com/u/${this.githubId}`;
  }

  public get departments(): TeamDepartment[] {
    return this.teamService.departments;
  }

  public abstract save(): void;

  public trackBy(index: number, { id }: TeamDepartment | TeamMember): string {
    return id;
  }
}
