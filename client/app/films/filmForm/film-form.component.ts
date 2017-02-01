import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Film } from '../../_models/film';
import { FilmService } from '../../_services/film.service';
import { Master } from '../../_models/master';
import { MasterService } from '../../_services/master.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsHelper } from '../../_helpers/forms.helper'
import {AuthenticationService} from '../../_services/authentication.service';

import 'rxjs/add/operator/switchMap';


@Component({
    templateUrl: './app/films/filmForm/film-form.component.html'
})

export class FilmFormComponent implements OnInit {
    formTitle: string;
    film: Film;
    error: string = '';
    success: boolean = false;

    locations: Master[];
    types: Master[];

    constructor(private route: ActivatedRoute
        , private authService: AuthenticationService
        , private router: Router
        , private filmService: FilmService
        , private masterService: MasterService
        , private formsHelper: FormsHelper
        , private location: Location) { }

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                var id = +params['id'];
                if (id > 0) {                    
                    return this.filmService.getById(id);
                } else {                    
                    return Observable.of(new Film()).map(o => new Film());
                }
            })
            .subscribe((data: Film) => {
                this.film = data;
                if (this.film.id) {
                    this.formTitle = 'Película \'' + this.film.title + '\'';
                } else {
                    this.formTitle = 'Nueva película';
                }
            });

        this.masterService.getAll('0')
            .subscribe((data: Master[]) => { this.types = data; });

        this.masterService.getAll('1')
            .subscribe((data: Master[]) => { this.locations = data; });
    }

    onSubmit() {
        if (this.film.id) {
            this.filmService.update(this.film)
                .subscribe((data: boolean) => {
                    this.success = true;
                });
        } else {
            this.filmService.insert(this.film)
                .subscribe((data: boolean) => {
                    this.location.back();
                });
        }
    }

    deleteFilm() {
        this.filmService.delete(this.film)
            .subscribe((data: boolean) => {
                this.location.back();
            });
    }

    isReadOnly(): boolean {
        return !this.authService.isUserLogedAdmin();
    }    
}