import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthServices } from '../admin/shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthServices,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            console.log('Authentication')
            req = req.clone({
                setParams: {
                    auth: <any>this.auth.token
                }
            })
        }
        return next.handle(req)
      .pipe(
        tap(() => {
          console.log('Intercept')
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('[Interceptor Error]: ', error)
          if (error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      )
    }
}