System.register(["@angular/core", "../films/filmsList/films-list.component", "../_services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, films_list_component_1, authentication_service_1, DashboardFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (films_list_component_1_1) {
                films_list_component_1 = films_list_component_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            DashboardFormComponent = (function () {
                function DashboardFormComponent(authService) {
                    this.authService = authService;
                }
                DashboardFormComponent.prototype.searchFilmByTitle = function (term) {
                    this.filmListComponent.searchByTitle(term);
                };
                return DashboardFormComponent;
            }());
            __decorate([
                core_1.ViewChild(films_list_component_1.FilmListComponent),
                __metadata("design:type", films_list_component_1.FilmListComponent)
            ], DashboardFormComponent.prototype, "filmListComponent", void 0);
            DashboardFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/dashboard/dashboard-form.component.html'
                }),
                __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
            ], DashboardFormComponent);
            exports_1("DashboardFormComponent", DashboardFormComponent);
        }
    };
});
//# sourceMappingURL=dashboard-form.component.js.map