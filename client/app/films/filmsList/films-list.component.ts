import { Component, OnInit, AfterViewInit, Input, QueryList, ViewChildren } from '@angular/core';
import { FilmService } from '../../_services/film.service';
import { Film } from '../../_models/film';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from '../../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ChartItem } from '../../_models/chartItem'
import { ChartComponent } from 'angular2-chartjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
  selector: 'films-list',
  templateUrl: './app/films/filmsList/films-list.component.html'
})

export class FilmListComponent implements OnInit, AfterViewInit {
  @Input() masterIdToSearch: number; //lo uso cuando voy a mostrar las peliculas de un maestro, 
  @Input() masterType: string;
  @ViewChildren(ChartComponent) charts: QueryList<ChartComponent>;

  items: Film[];
  showLocation: boolean = true;
  showType: boolean = true;
  listTitle: string;


  /* chart config */
  chartType: string = 'doughnut';
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  /* chart data */
  typesChartData = this.getNewChartData();

  private searchTitleStream = new Subject<string>();

  constructor(private authenticationService: AuthenticationService
    , private route: ActivatedRoute
    , private filmService: FilmService) {

    this.filmService.searchByTyle(this.searchTitleStream)
      .subscribe(results => {
        this.listTitle = 'Peliculas encontradas';
        this.items = results

        this.configureTypesChart();
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

  ngAfterViewInit() {
    this.charts.map(chart => {
      //alert(chart);
    })
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
        this.configureTypesChart();
      });
  }

  getByTypeId() {
    this.showType = false;
    this.filmService.getByTypeId(this.masterIdToSearch)
      .subscribe((data: Film[]) => {
        this.items = data;
        this.listTitle = 'Peliculas';
        this.configureTypesChart();
      });
  }

  getNewChartData() {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
        }
      ]
    };
  }

  configureTypesChart() {
    this.typesChartData = this.getNewChartData();

    let locs: ChartItem[] = new Array<ChartItem>();
    for (let film of this.items) {
      let foundItems = locs.filter(item => item.label == film.typeName);
      if (foundItems.length == 0) {
        var newItem: ChartItem = new ChartItem();
        newItem.label = film.typeName;
        newItem.count = 1;
        locs.push(newItem);
      } else {
        foundItems[0].count += 1;
      }
    }

    for (let item of locs) {
      this.typesChartData.labels.push(item.label);
      this.typesChartData.datasets[0].data.push(item.count);
    }
  }
}