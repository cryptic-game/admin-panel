import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin-access',
  templateUrl: './access.component.html',
  styleUrls: [ './access.component.scss' ]
})
export class AccessComponent {

  currentPage = '0';

  constructor(
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.navigationService.init('Access');
    this.navigationService.showSlideOut(undefined);
    this.activatedRoute.params.subscribe(value => this.currentPage = value.page || '1');
  }

  setPage(page: number): void {
    this.router.navigate([ 'access', page ]).then();
  }
}
