System.register(["@angular/core", "@angular/common", "../../_models/film", "../../_services/film.service", "../../_services/master.service", "rxjs/Observable", "@angular/router", "../../_helpers/forms.helper", "../../_services/authentication.service", "rxjs/add/operator/switchMap"], function (exports_1, context_1) {
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
    var core_1, common_1, film_1, film_service_1, master_service_1, Observable_1, router_1, forms_helper_1, authentication_service_1, FilmFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (film_1_1) {
                film_1 = film_1_1;
            },
            function (film_service_1_1) {
                film_service_1 = film_service_1_1;
            },
            function (master_service_1_1) {
                master_service_1 = master_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_helper_1_1) {
                forms_helper_1 = forms_helper_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            FilmFormComponent = (function () {
                function FilmFormComponent(route, authService, router, filmService, masterService, formsHelper, location) {
                    this.route = route;
                    this.authService = authService;
                    this.router = router;
                    this.filmService = filmService;
                    this.masterService = masterService;
                    this.formsHelper = formsHelper;
                    this.location = location;
                    this.error = '';
                    this.success = false;
                }
                FilmFormComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params
                        .switchMap(function (params) {
                        var id = +params['id'];
                        if (id > 0) {
                            return _this.filmService.getById(id);
                        }
                        else {
                            return Observable_1.Observable.of(new film_1.Film()).map(function (o) { return new film_1.Film(); });
                        }
                    })
                        .subscribe(function (data) {
                        _this.film = data;
                        if (_this.film.id) {
                            _this.formTitle = 'Película \'' + _this.film.title + '\'';
                        }
                        else {
                            _this.formTitle = 'Nueva película';
                        }
                    });
                    this.masterService.getAll('0')
                        .subscribe(function (data) { _this.types = data; });
                    this.masterService.getAll('1')
                        .subscribe(function (data) { _this.locations = data; });
                };
                FilmFormComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.film.id) {
                        this.filmService.update(this.film)
                            .subscribe(function (data) {
                            _this.success = true;
                        });
                    }
                    else {
                        this.filmService.insert(this.film)
                            .subscribe(function (data) {
                            _this.location.back();
                        });
                    }
                };
                FilmFormComponent.prototype.deleteFilm = function () {
                    var _this = this;
                    this.filmService.delete(this.film)
                        .subscribe(function (data) {
                        _this.location.back();
                    });
                };
                FilmFormComponent.prototype.isReadOnly = function () {
                    return !this.authService.isUserLogedAdmin();
                };
                return FilmFormComponent;
            }());
            FilmFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/films/filmForm/film-form.component.html'
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    authentication_service_1.AuthenticationService,
                    router_1.Router,
                    film_service_1.FilmService,
                    master_service_1.MasterService,
                    forms_helper_1.FormsHelper,
                    common_1.Location])
            ], FilmFormComponent);
            exports_1("FilmFormComponent", FilmFormComponent);
        }
    };
});
//# sourceMappingURL=film-form.component.js.map