System.register(["@angular/core", "../../_services/film.service", "rxjs/Observable", "rxjs/Subject", "../../_services/authentication.service", "@angular/router", "rxjs/add/operator/map", "rxjs/add/operator/filter", "rxjs/add/operator/debounceTime", "rxjs/add/operator/distinctUntilChanged", "rxjs/add/observable/of"], function (exports_1, context_1) {
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
    var core_1, film_service_1, Observable_1, Subject_1, authentication_service_1, router_1, FilmListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (film_service_1_1) {
                film_service_1 = film_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
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
                    this.searchTitleStream = new Subject_1.Subject();
                    this.items$ = this.searchTitleStream
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(function (title) {
                        if (title && title.length > 0) {
                            _this.listTitle = 'Peliculas encontradas';
                            return _this.filmService.searchByTitle(title);
                        }
                        else {
                            return Observable_1.Observable.of([]);
                        }
                    });
                }
                FilmListComponent.prototype.searchByTitle = function (title) {
                    this.searched = true;
                    this.searchTitleStream.next(title);
                };
                FilmListComponent.prototype.getByLocationId = function () {
                    var _this = this;
                    this.showLocation = false;
                    this.searched = true;
                    this.filmService.getByLocationId(this.masterIdToSearch)
                        .subscribe(function (data) {
                        _this.items$ = Observable_1.Observable.of(data);
                        _this.listTitle = 'Peliculas';
                    });
                };
                FilmListComponent.prototype.getByTypeId = function () {
                    var _this = this;
                    this.showType = false;
                    this.searched = true;
                    this.filmService.getByTypeId(this.masterIdToSearch)
                        .subscribe(function (data) {
                        _this.items$ = Observable_1.Observable.of(data);
                        _this.listTitle = 'Peliculas';
                    });
                };
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