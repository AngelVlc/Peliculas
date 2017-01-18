import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';

import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch'
//import 'rxjs/add/observable/throw'


@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        return this.http
            .get('/api/users', this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => r.json() as User[]);
    }

   /* tratarErrores(error) {
        console.log(JSON.stringify(error));
        if (error.status == 401) {
            console.log("Error de permisos");            
        }
        else {
            console.log("Otro Error");
        }
        return Observable.throw(error._body)
    }*/
}