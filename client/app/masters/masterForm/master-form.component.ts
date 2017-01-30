import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Master } from '../../_models/master';
import { MasterService } from '../../_services/master.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsHelper } from '../../_helpers/forms.helper'

import { Film } from '../../_models/film';
import { FilmListComponent } from '../../films/filmsList/films-list.component';

import 'rxjs/add/operator/switchMap';


@Component({
    templateUrl: './app/masters/masterForm/master-form.component.html'
})

export class MasterFormComponent implements OnInit, AfterViewInit {
    @ViewChild(FilmListComponent)
    private filmListComponent: FilmListComponent;

    title: string;
    item: Master;
    error: string = '';
    success: boolean = false;
    masterType: string;

    constructor(private route: ActivatedRoute
        , private router: Router
        , private masterService: MasterService
        , private formsHelper: FormsHelper) {

        this.masterType = route.snapshot.data[0].masterType;
    }

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                var itemId = +params['id'];
                if (itemId > 0) {
                    return this.masterService.getById(this.masterType, itemId);
                } else {
                    return Observable.of(new Master()).map(o => new Master());
                }
            })
            .subscribe((data: Master) => {
                this.item = data;
                switch (this.masterType) {
                    case '0':
                        if (this.item.id) {
                            this.title = 'Tipo \'' + this.item.name + '\'';
                        } else {
                            this.title = 'Nuevo tipo';
                        }
                        break;

                    case '1':
                        if (this.item.id) {
                            this.title = 'Localización \'' + this.item.name + '\'';
                        } else {
                            this.title = 'Nueva localización';
                        }
                        break;
                    default:
                        break;
                }
            });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            switch (this.masterType) {
                case '0':
                    this.filmListComponent.getByTypeId(this.item.id)
                    break;
                case '1':
                    this.filmListComponent.getByLocationId(this.item.id)
                    break;
                default:
                    break;
            }
        }, 0);
    }

    onSubmit() {
        if (this.item.id) {
            this.masterService.updateItem(this.masterType, this.item)
                .subscribe((data: boolean) => {
                    this.success = true;
                });
        } else {
            this.masterService.insertItem(this.masterType, this.item)
                .subscribe((data: boolean) => {
                    this.router.navigate(['/']);
                });
        }
    }

    deleteItem() {
        this.masterService.deleteItem(this.masterType, this.item)
            .subscribe((data: boolean) => {
                this.router.navigate(['/']);
            });
    }
}