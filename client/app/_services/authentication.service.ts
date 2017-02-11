import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<boolean> {
        var body = {
            name: username,
            password: password
        }

        return this.http.post('/api/authenticate', body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ token: token }))

                    // return true to indicate successful login
                    return true
                } else {
                    // return false to indicate failed login
                    throw new Error('Authenticate response without token');
                }
            })
    }

    logout(): void {
        localStorage.removeItem('currentUser')
    }

    isUserLoged(): boolean {
        var token = this.getTokenInfo();
        if (token && new Date(token.exp * 1000) > new Date()) {
            return true;
        }
        return false;
    }

    private getTokenInfo() {
        var localStorageInfo = JSON.parse(localStorage.getItem('currentUser'));

        if (localStorageInfo) {
            var base64Url = localStorageInfo.token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        } else {
            return null;
        }
    }

    getUserName() {
        if (this.isUserLoged()) {
            return this.getTokenInfo().userName.toLowerCase();
        } else {
            return null;
        }
    }

    isUserLogedAdmin(): boolean {
        var tokenInfo = this.getTokenInfo();
        if (tokenInfo && tokenInfo.roles.indexOf('ADMIN', 0) >= 0) {
            return true;
        }
        return false;
    }

    getRequestOptionsWithAuth(): RequestOptions {
        var localStorageInfo = JSON.parse(localStorage.getItem('currentUser'));
        var token = localStorageInfo.token;
        if (token) {
            let headers = new Headers();
            headers.append('x-access-token', token);
            headers.append('cache-control', 'no-chache');
            return new RequestOptions({ headers: headers });
        }
        return null;
    }
}