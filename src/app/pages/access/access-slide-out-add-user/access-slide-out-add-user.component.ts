import { Component } from '@angular/core';
import { SlideOutDelegate } from '../../../_core/navigation/slide-out/slide-out-delegate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, debounce, filter, map, mergeMap } from 'rxjs/operators';
import { interval, Observable, of } from 'rxjs';
import { AccessService } from '../../../_api/access/access.service';
import { AdminGroup } from '../../../_api/access/access';

@Component({
  selector: 'admin-access-slide-out-add-user',
  templateUrl: './access-slide-out-add-user.component.html',
  styleUrls: [ './access-slide-out-add-user.component.scss' ]
})
export class AccessSlideOutAddUserComponent extends SlideOutDelegate {

  form: FormGroup;
  githubId = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly accessService: AccessService
  ) {
    super('Add User');
    this.form = this.formBuilder.group({
      githubName: [ '', Validators.required ],
      adminGroups: this.formBuilder.array([ this.formBuilder.control('') ])
    });

    this.form.controls.githubName.valueChanges
      .pipe(
        filter(value => !!value),
        debounce(() => interval(1000)),
        mergeMap(value => this.loadGitHubId(value))
      )
      .subscribe(id => this.githubId = id);

    this.form.controls.adminGroups.valueChanges
      .subscribe(value => console.log(value));
  }

  get adminGroups(): AdminGroup[] {
    return this.accessService.groups;
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    const value: { /* Admin Groups */ } = this.form.value;
    // send to server
    this.form.reset();
    this.githubId = 0;

    this.close();
  }

  private loadGitHubId(username: string): Observable<number> {
    return this.httpClient.get<{ id: number }>(`https://api.github.com/users/${username}`)
      .pipe(
        map(data => data.id),
        catchError(error => {
          console.log(error);
          return of(undefined);
        })
      );
  }
}
