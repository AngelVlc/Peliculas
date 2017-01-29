System.register(["@angular/core", "@angular/http", "@angular/router", "./authentication.service", "./error-handler.service", "rxjs/add/operator/map", "rxjs/add/operator/catch"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, authentication_service_1, error_handler_service_1, FilmService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (error_handler_service_1_1) {
                error_handler_service_1 = error_handler_service_1_1;
            },
            function (_1) {
            },
            function (_2) {
            }
        ],
        execute: function () {
            FilmService = (function () {
                function FilmService(router, http, authenticationService, errorHandlerService) {
                    this.router = router;
                    this.http = http;
                    this.authenticationService = authenticationService;
                    this.errorHandlerService = errorHandlerService;
                    this._baseUrl = '/api/films';
                }
                FilmService.prototype.searchByTitle = function (titleToSearch) {
                    var params = new http_1.URLSearchParams();
                    params.set('title', titleToSearch);
                    var options = this.authenticationService.getRequestOptionsWithAuth();
                    options.search = params;
                    return this.internalGet(options);
                };
                FilmService.prototype.getByLocationId = function (locationId) {
                    var params = new http_1.URLSearchParams();
                    params.set('locationId', locationId.toString());
                    var options = this.authenticationService.getRequestOptionsWithAuth();
                    options.search = params;
                    return this.internalGet(options);
                };
                FilmService.prototype.getByTypeId = function (typeId) {
                    var params = new http_1.URLSearchParams();
                    params.set('typeId', typeId.toString());
                    var options = this.authenticationService.getRequestOptionsWithAuth();
                    options.search = params;
                    return this.internalGet(options);
                };
                FilmService.prototype.internalGet = function (options) {
                    return this.http
                        .get(this._baseUrl, options)
                        .map(function (r) { return r.json(); })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                FilmService.prototype.getById = function (id) {
                    return this.http
                        .get(this._baseUrl + '/' + id, this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return r.json(); })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                return FilmService;
            }());
            FilmService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [router_1.Router,
                    http_1.Http,
                    authentication_service_1.AuthenticationService,
                    error_handler_service_1.ErrorHandlerService])
            ], FilmService);
            exports_1("FilmService", FilmService);
        }
    };
});
//# sourceMappingURL=film.service.js.map