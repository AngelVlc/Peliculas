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
                return '/api/types/';
            case "1":
                return '/api/locations/';
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

    getById(masterType: string, id: number): Observable<Master> {
        return this.http
            .get(this.getBaseUrl(masterType) + id, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => r.json() as Master)
            .catch(this.errorHandlerService.handleError.bind(this));        
    }

    updateItem(masterType: string, item: Master): Observable<boolean> {
        var body: any = {
            id: item.id,
            name: item.name,
            remarks: item.remarks
        };

        return this.http
            .put(this.getBaseUrl(masterType) + item.id, body, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => true)
            .catch(this.errorHandlerService.handleError.bind(this));
    }

    deleteItem(masterType: string, item: Master): Observable<boolean> {
        return this.http
            .delete(this.getBaseUrl(masterType) + item.id, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => true)
            .catch(this.errorHandlerService.handleError.bind(this));
    }

    insertItem(masterType: string, item: Master): Observable<boolean> {
        return this.http
            .post(this.getBaseUrl(masterType), item, this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => true)
            .catch(this.errorHandlerService.handleError.bind(this));
    }
}