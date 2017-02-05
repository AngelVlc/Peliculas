import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FilmService } from '../../_services/film.service';
import { Film } from '../../_models/film';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from '../../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ChartItem } from '../../_models/chartItem'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
  selector: 'films-list',
  templateUrl: './app/films/filmsList/films-list.component.html'
})

export class FilmListComponent implements OnInit {
  @Input() masterIdToSearch: number; //lo uso cuando voy a mostrar las peliculas de un maestro, 
  @Input() masterType: string;

  items: Film[];
  showLocation: boolean = true;
  showType: boolean = true;
  listTitle: string;


  /* chart config */
  chartType: string = 'doughnut';
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      intersect: false
    },
    legend: {
      display: false
    }
  };

  /* chart data */
  chartLocationsData = this.getNewChartData();

  private searchTitleStream = new Subject<string>();

  constructor(private authenticationService: AuthenticationService
    , private route: ActivatedRoute
    , private filmService: FilmService) {

    this.filmService.searchByTyle(this.searchTitleStream)
      .subscribe(results => {
        this.listTitle = 'Peliculas encontradas';
        this.items = results

        this.chartLocationsData = this.getNewChartData();
        
        let locs: ChartItem[] = new Array<ChartItem>();
        for (let film of this.items) {
          let foundItems = locs.filter(item => item.label == film.locationName);
          if (foundItems.length == 0) {
            var newItem: ChartItem = new ChartItem();
            newItem.label = film.locationName;
            newItem.count = 1;
            locs.push(newItem);
          } else {
            foundItems[0].count += 1;
          }
        }

        for (let item of locs) {
          this.chartLocationsData.labels.push(item.label);
          this.chartLocationsData.datasets[0].data.push(item.count);
        }
      });
  }

  ngOnInit() {
    switch (this.masterType) {
      case '0':
        this.getByTypeId();
        break;
      case '1':
        this.getByLocationId();
        break;
      default:
        break;
    }
  }

  searchByTitle(title: string) {
    this.searchTitleStream.next(title);
  }

  getByLocationId() {
    this.showLocation = false;
    this.filmService.getByLocationId(this.masterIdToSearch)
      .subscribe((data: Film[]) => {
        this.items = data;
        this.listTitle = 'Peliculas';
      });
  }

  getByTypeId() {
    this.showType = false;
    this.filmService.getByTypeId(this.masterIdToSearch)
      .subscribe((data: Film[]) => {
        this.items = data;
        this.listTitle = 'Peliculas';
      });
  }

  getNewChartData() {
    return {
      labels: [],
      datasets: [
        {
          data: []
        }
      ]
    };
  }
}