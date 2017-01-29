import { Component } from '@angular/core';
import { FilmService } from '../../_services/film.service';
import { Film } from '../../_models/film';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

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

  private searchTitleStream = new Subject<string>();

  searchByTitle(title: string) { 
    this.searchTitleStream.next(title);
  }  

  constructor(private filmService: FilmService) {    
    this.items$ = this.searchTitleStream
          .debounceTime(300)
          .distinctUntilChanged()          
          .switchMap((title: string) => {
              if (title && title.length > 0) {
                return this.filmService.searchByTitle(title);
              } else {
               return  Observable.of([]);
              }
          });   

          
  }

}