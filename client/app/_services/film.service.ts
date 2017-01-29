import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { ErrorHandlerService } from './error-handler.service';

import { Film } from '../_models/film';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class FilmService {
    private _baseUrl: string = '/api/films';

    films: Observable<Film[]>;

    constructor(
        private router: Router,
        private http: Http,
        private authenticationService: AuthenticationService,
        private errorHandlerService: ErrorHandlerService) {
    }

    searchByTitle(titleToSearch: string): Observable<Film[]> {
        let params = new URLSearchParams();
        params.set('title', titleToSearch);

        let options = this.authenticationService.getRequestOptionsWithAuth();
        options.search = params;

        return this.internalGet(options);
    }

    getByLocationId(locationId: number) {
        let params = new URLSearchParams();
        params.set('locationId', locationId.toString());

        let options = this.authenticationService.getRequestOptionsWithAuth();
        options.search = params;

        return this.internalGet(options);
    }

    getByTypeId(typeId: number) {
        let params = new URLSearchParams();
        params.set('typeId', typeId.toString());

        let options = this.authenticationService.getRequestOptionsWithAuth();
        options.search = params;

        return this.internalGet(options);
    }

    internalGet(options: RequestOptions) {
        return this.http
            .get(this._baseUrl, options)
            .map((r: Response) => r.json() as Film[])
            .catch(this.errorHandlerService.handleError.bind(this));
    }


    getById(id: number): Observable<Film> {
        return this.http
            .get(this._baseUrl + '/' + id, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => r.json() as Film)
            .catch(this.errorHandlerService.handleError.bind(this));        
    }

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