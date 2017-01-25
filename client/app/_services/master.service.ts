import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { Master } from '../_models/master';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class MasterService {
    private _baseUrl: string = '/api/users/';

    constructor(
        private router: Router,
        private http: Http,
        private authenticationService: AuthenticationService,
        private errorHandlerService: ErrorHandlerService) {
    }

    private getBaseUrl(masterType: string) {
        switch (masterType)
        {
            case "0":
                return '/api/types';
            case "1":
                return '/api/locations';
            default:
                throw new Error('Invalid maser type');
        }
    }

    getAll(masterType: string): Observable<Master[]> {
        return this.http
            .get(this.getBaseUrl(masterType), this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => r.json() as Master[])
            .catch(this.errorHandlerService.handleError.bind(this));
    }

    // getUserById(userId: number): Observable<User> {
    //     return this.http
    //         .get(this._baseUrl + userId, this.authenticationService.getRequestOptionsWithAuth())
    //         .map((r: Response) => r.json() as User)
    //         .catch(this.errorHandlerService.handleError.bind(this));        
    // }

    // updateUser(user: User): Observable<boolean> {
    //     var body: any = {
    //         userId: user.userId,
    //         userName: user.userName,
    //         password: user.password,
    //         isAdmin: user.isAdmin
    //     };

    //     return this.http
    //         .put(this._baseUrl + user.userId, body, this.authenticationService.getRequestOptionsWithAuth())
    //         .map((r: Response) => true)
    //         .catch(this.errorHandlerService.handleError.bind(this));
    // }

    // deleteUser(user: User): Observable<boolean> {
    //     return this.http
    //         .delete(this._baseUrl + user.userId, this.authenticationService.getRequestOptionsWithAuth())
    //         .map((r: Response) => true)
    //         .catch(this.errorHandlerService.handleError.bind(this));
    // }

    // insertUser(user: User): Observable<boolean> {
    //     return this.http
    //         .post(this._baseUrl, user, this.authenticationService.getRequestOptionsWithAuth())
    //         .map((r: Response) => true)
    //         .catch(this.errorHandlerService.handleError.bind(this));
    // }
}