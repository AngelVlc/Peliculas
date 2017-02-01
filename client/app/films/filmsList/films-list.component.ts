import { Component } from '@angular/core';
import { FilmService } from '../../_services/film.service';
import { Film } from '../../_models/film';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import { AuthenticationService } from '../../_services/authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
    selector: 'films-list',
    templateUrl: './app/films/filmsList/films-list.component.html'
})

export class FilmListComponent {    
  items$: Observable<Film[]>;
  showLocation: boolean = true;
  showType: boolean = true;
  searched: boolean;
  listTitle: string;

  private searchTitleStream = new Subject<string>();  

  searchByTitle(title: string) {     
    this.searched = true;    
    this.searchTitleStream.next(title);
  }  

  getByLocationId(locationId: number) {
    this.showLocation = false;
    this.searched = true;
    this.filmService.getByLocationId(locationId)
      .subscribe((data: Film[]) => {
        this.items$ = Observable.of(data);
        this.listTitle = 'Peliculas';
      });
  }

  getByTypeId(typeId: number) {
    this.showType = false;
    this.searched = true;
    this.filmService.getByTypeId(typeId)
      .subscribe((data: Film[]) => {
        this.items$ = Observable.of(data);
        this.listTitle = 'Peliculas';
      });
  }

  constructor(private authenticationService: AuthenticationService
              , private filmService: FilmService) {    
    this.items$ = this.searchTitleStream
          .debounceTime(300)
          .distinctUntilChanged()          
          .switchMap((title: string) => {
              if (title && title.length > 0) {
                this.listTitle = 'Peliculas encontradas';
                return this.filmService.searchByTitle(title);
              } else {
               return  Observable.of([]);
              }
          });   

          
  }

}