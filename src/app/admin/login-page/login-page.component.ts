import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interface';
import { AuthServices } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public submited = false;
  public message: String;

  constructor(
    public auth: AuthServices,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['loginAgain']) {
        this.message = 'Будь ласка, введіть данні'
      } else if (params['authFailed']) {
        this.message = 'Cесія закінчилася. Будь ласка, введіть дані заново'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }


  onSubmit() {
    if (this.form.invalid) {
      return
    }
    this.submited = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submited = false;
    }, () => {
      this.submited = false;
    });
  }

}
