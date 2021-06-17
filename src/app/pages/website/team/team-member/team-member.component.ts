import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TeamService } from '../../../../core/api/website/team/team.service';
import { TeamMemberBaseComponent } from './team-member-base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent extends TeamMemberBaseComponent implements OnDestroy {

  private readonly paramsSubscription: Subscription;
  private id?: string;

  constructor(
    fb: FormBuilder,
    teamService: TeamService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    super(fb, teamService);
    console.log('test');

    this.paramsSubscription = this.route.params.pipe(
      filter(({ memberId }) => memberId),
      delay(500),
      map(({ memberId }) => this.teamService.findMember(memberId))
    )
      .subscribe(member => {
        this.id = member?.id;
        this.githubId = member?.githubId;


        if (member) {
          this.form.reset({
            ...member,
            joined: new Date(member.joined).toISOString().split('T', 2)[0]
          }, { emitEvent: false });

          this.teamService.findGitHubName(member.githubId)
            .subscribe(name => this.form.get('githubName')?.setValue(name, { emitEvent: false }));
        }
        else {
          this.form.reset({}, { emitEvent: false });
        }
      });
  }

  ngOnDestroy(): void {
    this.githubSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

  public save(): void {
    if (!(this.form.valid && this.id && this.githubId)) {
      return;
    }

    const value = this.form.value;

    this.teamService.updateMember({
      id: this.id,
      name: value.name,
      githubId: this.githubId,
      joined: new Date(value.joined).toISOString(),
      departmentId: value.departmentId
    }).subscribe();
  }
}
