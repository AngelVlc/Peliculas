System.register(["@angular/core", "../../_services/film.service", "rxjs/Subject", "../../_services/authentication.service", "@angular/router", "../../_models/chartItem", "angular2-chartjs", "rxjs/add/operator/map", "rxjs/add/operator/filter", "rxjs/add/operator/debounceTime", "rxjs/add/operator/distinctUntilChanged", "rxjs/add/observable/of"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, film_service_1, Subject_1, authentication_service_1, router_1, chartItem_1, angular2_chartjs_1, FilmListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (film_service_1_1) {
                film_service_1 = film_service_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (chartItem_1_1) {
                chartItem_1 = chartItem_1_1;
            },
            function (angular2_chartjs_1_1) {
                angular2_chartjs_1 = angular2_chartjs_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            }
        ],
        execute: function () {
            FilmListComponent = (function () {
                function FilmListComponent(authenticationService, route, filmService) {
                    var _this = this;
                    this.authenticationService = authenticationService;
                    this.route = route;
                    this.filmService = filmService;
                    this.showLocation = true;
                    this.showType = true;
                    /* chart config */
                    this.chartType = 'doughnut';
                    this.chartOptions = {
                        responsive: true,
                        maintainAspectRatio: false
                    };
                    /* chart data */
                    this.typesChartData = this.getNewChartData();
                    this.searchTitleStream = new Subject_1.Subject();
                    this.filmService.searchByTyle(this.searchTitleStream)
                        .subscribe(function (results) {
                        _this.listTitle = 'Peliculas encontradas';
                        _this.items = results;
                        _this.configureTypesChart();
                    });
                }
                FilmListComponent.prototype.ngOnInit = function () {
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
                };
                FilmListComponent.prototype.ngAfterViewInit = function () {
                    this.charts.map(function (chart) {
                        //alert(chart);
                    });
                };
                FilmListComponent.prototype.searchByTitle = function (title) {
                    this.searchTitleStream.next(title);
                };
                FilmListComponent.prototype.getByLocationId = function () {
                    var _this = this;
                    this.showLocation = false;
                    this.filmService.getByLocationId(this.masterIdToSearch)
                        .subscribe(function (data) {
                        _this.items = data;
                        _this.listTitle = 'Peliculas';
                        _this.configureTypesChart();
                    });
                };
                FilmListComponent.prototype.getByTypeId = function () {
                    var _this = this;
                    this.showType = false;
                    this.filmService.getByTypeId(this.masterIdToSearch)
                        .subscribe(function (data) {
                        _this.items = data;
                        _this.listTitle = 'Peliculas';
                        _this.configureTypesChart();
                    });
                };
                FilmListComponent.prototype.getNewChartData = function () {
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
                };
                FilmListComponent.prototype.configureTypesChart = function () {
                    this.typesChartData = this.getNewChartData();
                    var locs = new Array();
                    var _loop_1 = function (film) {
                        var foundItems = locs.filter(function (item) { return item.label == film.typeName; });
                        if (foundItems.length == 0) {
                            newItem = new chartItem_1.ChartItem();
                            newItem.label = film.typeName;
                            newItem.count = 1;
                            locs.push(newItem);
                        }
                        else {
                            foundItems[0].count += 1;
                        }
                    };
                    var newItem;
                    for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                        var film = _a[_i];
                        _loop_1(film);
                    }
                    for (var _b = 0, locs_1 = locs; _b < locs_1.length; _b++) {
                        var item = locs_1[_b];
                        this.typesChartData.labels.push(item.label);
                        this.typesChartData.datasets[0].data.push(item.count);
                    }
                };
                return FilmListComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Number)
            ], FilmListComponent.prototype, "masterIdToSearch", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], FilmListComponent.prototype, "masterType", void 0);
            __decorate([
                core_1.ViewChildren(angular2_chartjs_1.ChartComponent),
                __metadata("design:type", core_1.QueryList)
            ], FilmListComponent.prototype, "charts", void 0);
            FilmListComponent = __decorate([
                core_1.Component({
                    selector: 'films-list',
                    templateUrl: './app/films/filmsList/films-list.component.html'
                }),
                __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
                    router_1.ActivatedRoute,
                    film_service_1.FilmService])
            ], FilmListComponent);
            exports_1("FilmListComponent", FilmListComponent);
        }
    };
});
//# sourceMappingURL=films-list.component.js.map