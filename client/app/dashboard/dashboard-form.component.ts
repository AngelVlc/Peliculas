import { Component, ViewChild } from '@angular/core';
import { Film } from '../_models/film';
import { FilmListComponent } from '../films/filmsList/films-list.component';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  templateUrl: './app/dashboard/dashboard-form.component.html'
})

export class DashboardFormComponent { 
  constructor(private authService: AuthenticationService) { }

  @ViewChild(FilmListComponent)
  private filmListComponent: FilmListComponent;

  searchFilmByTitle(term: string) { 
    this.filmListComponent.searchByTitle(term);  
  }
}