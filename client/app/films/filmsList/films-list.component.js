System.register(["@angular/core", "../../_services/film.service", "rxjs/Observable", "rxjs/Subject", "../../_services/authentication.service", "rxjs/add/operator/map", "rxjs/add/operator/filter", "rxjs/add/operator/debounceTime", "rxjs/add/operator/distinctUntilChanged", "rxjs/add/observable/of"], function (exports_1, context_1) {
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
    var core_1, film_service_1, Observable_1, Subject_1, authentication_service_1, FilmListComponent;
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
                function FilmListComponent(authenticationService, filmService) {
                    var _this = this;
                    this.authenticationService = authenticationService;
                    this.filmService = filmService;
                    this.searchTitleStream = new Subject_1.Subject();
                    this.items$ = this.searchTitleStream
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(function (title) {
                        if (title && title.length > 0) {
                            return _this.filmService.searchByTitle(title);
                        }
                        else {
                            return Observable_1.Observable.of([]);
                        }
                    });
                }
                FilmListComponent.prototype.searchByTitle = function (title) {
                    this.searchTitleStream.next(title);
                };
                FilmListComponent.prototype.getByLocationId = function (locationId) {
                    var _this = this;
                    this.fromLocation = true;
                    this.filmService.getByLocationId(locationId)
                        .subscribe(function (data) { return _this.items$ = Observable_1.Observable.of(data); });
                };
                FilmListComponent.prototype.getByTypeId = function (typeId) {
                    var _this = this;
                    this.fromLocation = true;
                    this.filmService.getByTypeId(typeId)
                        .subscribe(function (data) { return _this.items$ = Observable_1.Observable.of(data); });
                };
                return FilmListComponent;
            }());
            FilmListComponent = __decorate([
                core_1.Component({
                    selector: 'films-list',
                    templateUrl: './app/films/filmsList/films-list.component.html'
                }),
                __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
                    film_service_1.FilmService])
            ], FilmListComponent);
            exports_1("FilmListComponent", FilmListComponent);
        }
    };
});
//# sourceMappingURL=films-list.component.js.map