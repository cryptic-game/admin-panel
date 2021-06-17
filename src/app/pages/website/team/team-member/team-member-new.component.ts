import { Component, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { TeamMemberBaseComponent } from './team-member-base.component';
import { FormBuilder } from '@angular/forms';
import { TeamService } from '../../../../core/api/website/team/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-member-new',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberNewComponent extends TeamMemberBaseComponent implements OnDestroy {

  constructor(
    fb: FormBuilder,
    teamService: TeamService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    super(fb, teamService);
  }

  ngOnDestroy(): void {
    this.githubSubscription.unsubscribe();
  }

  public save(): void {
    if (!(this.form.valid && this.githubId)) {
      return;
    }

    const value = this.form.value;

    this.teamService.addMember({
      // @ts-expect-error
      id: undefined,
      name: value.name,
      githubId: this.githubId,
      joined: new Date(value.joined).toISOString(),
      departmentId: value.departmentId
    })
      .pipe(switchMap(({ id }) => this.router.navigate([ '..', id ], { relativeTo: this.route })))
      .subscribe();
  }
}
