System.register(["@angular/core", "rxjs/Observable", "rxjs/Subject", "../_services/film.service", "rxjs/add/operator/debounceTime", "rxjs/add/operator/distinctUntilChanged", "rxjs/add/observable/of"], function (exports_1, context_1) {
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
    var core_1, Observable_1, Subject_1, film_service_1, DashboardFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (film_service_1_1) {
                film_service_1 = film_service_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            }
        ],
        execute: function () {
            DashboardFormComponent = (function () {
                function DashboardFormComponent(filmService) {
                    var _this = this;
                    this.filmService = filmService;
                    this.searchTermStream = new Subject_1.Subject();
                    this.items = this.searchTermStream
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(function (term) { return term.length > 0 ? _this.filmService.search(term) : Observable_1.Observable.of([]); });
                }
                DashboardFormComponent.prototype.search = function (term) { this.searchTermStream.next(term); };
                return DashboardFormComponent;
            }());
            DashboardFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/dashboard/dashboard-form.component.html'
                }),
                __metadata("design:paramtypes", [film_service_1.FilmService])
            ], DashboardFormComponent);
            exports_1("DashboardFormComponent", DashboardFormComponent);
        }
    };
});
//# sourceMappingURL=dashboard-form.component.js.map