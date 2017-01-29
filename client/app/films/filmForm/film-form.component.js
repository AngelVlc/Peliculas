System.register(["@angular/core", "../../_models/film", "../../_services/film.service", "rxjs/Observable", "@angular/router", "../../_helpers/forms.helper", "rxjs/add/operator/switchMap"], function (exports_1, context_1) {
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
    var core_1, film_1, film_service_1, Observable_1, router_1, forms_helper_1, FilmFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (film_1_1) {
                film_1 = film_1_1;
            },
            function (film_service_1_1) {
                film_service_1 = film_service_1_1;
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
            function (_1) {
            }
        ],
        execute: function () {
            FilmFormComponent = (function () {
                function FilmFormComponent(route, router, filmService, formsHelper) {
                    this.route = route;
                    this.router = router;
                    this.filmService = filmService;
                    this.formsHelper = formsHelper;
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
                            _this.title = 'Pelicula ' + _this.film.title;
                        }
                        else {
                            _this.title = 'Nueva película';
                        }
                    });
                };
                FilmFormComponent.prototype.onSubmit = function () {
                    // if (this.user.userId) {
                    //     this.userService.updateUser(this.user)
                    //         .subscribe((data: boolean) => {
                    //             this.success = true;
                    //         });
                    // } else {
                    //     this.userService.insertUser(this.user)
                    //         .subscribe((data: boolean) => {
                    //             this.router.navigate(['/usersList']);
                    //         });
                    // }
                };
                FilmFormComponent.prototype.deleteUser = function () {
                    // this.userService.deleteUser(this.user)
                    //     .subscribe((data: boolean) => {
                    //         this.router.navigate(['/usersList']);
                    //     });
                };
                return FilmFormComponent;
            }());
            FilmFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/films/filmForm/film-form.component.html'
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    film_service_1.FilmService,
                    forms_helper_1.FormsHelper])
            ], FilmFormComponent);
            exports_1("FilmFormComponent", FilmFormComponent);
        }
    };
});
//# sourceMappingURL=film-form.component.js.map