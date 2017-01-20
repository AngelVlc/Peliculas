import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        return this.http
            .get('/api/users', this.authenticationService.getRequestOptionsWithAuth())
            .map((r: Response) => r.json() as User[])
     }
}