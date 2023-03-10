import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/app/environments/environment";
import { FbAuthResponse, User } from "src/app/shared/interface";

@Injectable({ providedIn: 'root' })
export class AuthServices {

    public error$: Subject<any> = new Subject<string>();

    constructor(private http: HttpClient) { }

    get token() {
        const expDate = new Date(<any>localStorage.getItem('fb-token-exp'))
        if (new Date() > expDate) {
            this.logout();
            return null
        }
        return localStorage.getItem('fb-token')
    }

    public login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.hedleError.bind(this))
            )
    }

    public logout() {
        this.setToken(null);
    }

    public isAuthenticated(): boolean {
        return !!this.token
    }

    private hedleError(error: any) {
        const { message } = error.error.error;
        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Введіть коректний Email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Невірний пароль');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email не знайдено');
                break;
        }

        return throwError(() => new Error())
    }

    private setToken(response: any) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }

}