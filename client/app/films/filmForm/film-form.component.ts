import { Component, OnInit } from '@angular/core';
import { Film } from '../../_models/film';
import { FilmService } from '../../_services/film.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsHelper } from '../../_helpers/forms.helper'

import 'rxjs/add/operator/switchMap';


@Component({
    templateUrl: './app/films/filmForm/film-form.component.html'
})

export class FilmFormComponent implements OnInit {
    title: string;
    film: Film;
    error: string = '';
    success: boolean = false;

    constructor(private route: ActivatedRoute
        , private router: Router
        , private filmService: FilmService
        , private formsHelper: FormsHelper) { }

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
                    this.title = 'Pelicula ' + this.film.title;
                } else {
                    this.title = 'Nueva película';
                }
            });
    }

    onSubmit() {
        // if (this.user.userId) {
        //     this.userService.updateUser(this.user)
        //         .subscribe((data: boolean) => {
        //             this.success = true;
        //         });
        // } else {
        //     this.userService.insertUser(this.user)
        //         .subscribe((data: boolean) => {
        //             this.router.navigate(['/usersList']);
        //         });
        // }
    }

    deleteUser() {
        // this.userService.deleteUser(this.user)
        //     .subscribe((data: boolean) => {
        //         this.router.navigate(['/usersList']);
        //     });
    }
}