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

    update(film: Film): Observable<boolean> {
        return this.http
            .put(this._baseUrl + '/' + film.id, film, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => true)
            .catch(this.errorHandlerService.handleError.bind(this));
    }

    delete(film: Film): Observable<boolean> {
        return this.http
            .delete(this._baseUrl + '/' + film.id, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => true)
            .catch(this.errorHandlerService.handleError.bind(this));
    }

    insert(film: Film): Observable<boolean> {
        return this.http
            .post(this._baseUrl, film, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => true)
            .catch(this.errorHandlerService.handleError.bind(this));
    }
}