import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../../../../core/api/website/team/team.service';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-department',
  templateUrl: './team-department.component.html',
  styleUrls: ['./team-department.component.scss']
})
export class TeamDepartmentComponent implements OnDestroy {

  form = this.fb.group({
    name: [ '', Validators.required ],
    description: [ '', Validators.required ]
  });
  private id?: string;

  private readonly paramsSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly teamService: TeamService,
    private readonly route: ActivatedRoute
  ) {
    this.paramsSubscription = this.route.params.pipe(
      filter(({ departmentId }) => departmentId),
      delay(500),
      map(({ departmentId }) => this.teamService.findDepartment(departmentId))
    )
      .subscribe(department => {
        this.id = department?.id;

        if (department) {
          this.form.reset(department, { emitEvent: false });
        }
        else {
          this.form.reset({}, { emitEvent: false });
        }
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  public save(): void {
    if (this.id && this.form.valid) {
      this.teamService.updateDepartment({ id: this.id, ...this.form.value })
        .subscribe(department => console.log('Updated department:', department));
    }
  }
}
