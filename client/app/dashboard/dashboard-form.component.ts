import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import { Film } from '../_models/film';
import { FilmService } from '../_services/film.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
  templateUrl: './app/dashboard/dashboard-form.component.html'
})

export class DashboardFormComponent {   
  items: Observable<Film[]>;

  private searchTermStream = new Subject<string>();


  search(term: string) { this.searchTermStream.next(term); }  

  constructor(private filmService: FilmService) {
    this.items = this.searchTermStream
          .debounceTime(300)
          .distinctUntilChanged()
          .switchMap((term: string) => term.length > 0 ? this.filmService.search(term): Observable.of([]));
  }


}