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
                    return false
                }
            })
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null
        localStorage.removeItem('currentUser')
    }

    isUserLoged(): boolean {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }

    isUserLogedAdmin(): boolean {
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser && JSON.parse(currentUser).roles.indexOf('ADMIN', 0) >= 0) {
            return true;
        }
        return false;
    }
}