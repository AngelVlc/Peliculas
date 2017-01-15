import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Promise<User[]> {        
        return this.http.get('/api/users', this.authenticationService.getRequestOptionsWithAuth())         
            .toPromise()
            .then(response => {                
                return response.json() as User[];
            })
            .catch(err => {
                err = err;
                throw new Error(err.status + ' ' + err._body);
            });            
    }
}