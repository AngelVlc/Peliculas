import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
  
@Injectable()
export class ErrorHandlerService {
    constructor(
        private router: Router) {
    }  

    handleError(error: Response | any) {
        switch (error.status) {
          case 401:
            if (error._body.indexOf('jwt expired') > 0) {
              this.router.navigate(['/error401TokenExpired']);
            }
            else {
              this.router.navigate(['/error401']);
            }
            break;

          default:
            this.router.navigate(['/genericError']);
        }
 
        return Observable.of();
    }     
}