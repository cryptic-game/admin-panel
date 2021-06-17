import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../../../../core/api/website/team/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-team-department-new',
  templateUrl: './team-department-new.component.html',
  styleUrls: ['./team-department-new.component.scss']
})
export class TeamDepartmentNewComponent {

  form = this.fb.group({
    name: [ '', Validators.required ],
    description: [ '', Validators.required ]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly teamService: TeamService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  public save(): void {
    if (this.form.valid) {
      this.teamService.addDepartment(this.form.value)
        .pipe(switchMap(({ id }) => this.router.navigate([ '..', id ], { relativeTo: this.route })))
        .subscribe();
    }
  }
}
