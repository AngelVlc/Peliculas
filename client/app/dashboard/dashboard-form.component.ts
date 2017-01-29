import { Component, ViewChild } from '@angular/core';
import { Film } from '../_models/film';
import { FilmListComponent } from '../films/filmsList/films-list.component';

@Component({
  templateUrl: './app/dashboard/dashboard-form.component.html'
})

export class DashboardFormComponent {   
  @ViewChild(FilmListComponent)
  private filmListComponent: FilmListComponent;

  searchFilmByTitle(term: string) { 
    this.filmListComponent.searchByTitle(term);  
  }
}