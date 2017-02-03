import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.token = currentUser && currentUser.token
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
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, roles: response.json().roles }))

                    // return true to indicate successful login
                    return true
                } else {
                    // return false to indicate failed login
                    throw new Error('Authenticate response without token');
                }
            })
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null
        localStorage.removeItem('currentUser')
    }

    isUserLoged(): boolean {
        if (this.getCurrentUser()) {
            return true;
        }
        return false;
    }

    private getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getCurrentUserName() {
        if (this.isUserLoged()) {
            return this.getCurrentUser().username.toLowerCase();
        } else {
            return null;
        }        
    }

    isUserLogedAdmin(): boolean {
        var currentUser = this.getCurrentUser();
        if (currentUser && currentUser.roles.indexOf('ADMIN', 0) >= 0) {
            return true;
        }
        return false;
    }

    getRequestOptionsWithAuth(): RequestOptions {
        var currentUser = this.getCurrentUser();
        if (currentUser && currentUser.token) {
            let headers = new Headers();
            headers.append('x-access-token', currentUser.token);
            headers.append('cache-control', 'no-chache');
            return new RequestOptions({ headers: headers });
        }
        return null;
    }
}