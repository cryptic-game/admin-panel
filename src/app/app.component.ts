import { Component } from '@angular/core';
import { AuthService } from './core/api/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly authService: AuthService
  ) {
  }
}
