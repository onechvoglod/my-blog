import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from './services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(
    private router: Router,
    public auth: AuthServices) {

  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.loguot();
    this.router.navigate(['/admin', 'login']);

  }
}