import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandlerService } from './error-handler.service';
  
@Injectable()
export class UserService {
    private _baseUrl: string = '/api/users/';

    constructor(
        private router: Router,
        private http: Http,
        private authenticationService: AuthenticationService,
        private errorHandlerService: ErrorHandlerService) {
    }   

    getUsers(): Observable<User[]> {
        return this.http
            .get(this._baseUrl, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => r.json() as User[])
            .catch(this.errorHandlerService.handleError.bind(this));
     }

     getUserById(userId: number): Observable<User> {
         return this.http
            .get(this._baseUrl + '/' + userId, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => r.json() as User)
            .catch(this.errorHandlerService.handleError.bind(this));
     }
}