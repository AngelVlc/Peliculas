System.register(["@angular/core", "@angular/http", "@angular/router", "./authentication.service", "rxjs/add/operator/map", "rxjs/add/operator/catch", "./error-handler.service"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, authentication_service_1, error_handler_service_1, MasterService;
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
            function (_1) {
            },
            function (_2) {
            },
            function (error_handler_service_1_1) {
                error_handler_service_1 = error_handler_service_1_1;
            }
        ],
        execute: function () {
            MasterService = (function () {
                function MasterService(router, http, authenticationService, errorHandlerService) {
                    this.router = router;
                    this.http = http;
                    this.authenticationService = authenticationService;
                    this.errorHandlerService = errorHandlerService;
                    this._baseUrl = '/api/users/';
                }
                MasterService.prototype.getBaseUrl = function (masterType) {
                    switch (masterType) {
                        case "0":
                            return '/api/types';
                        case "1":
                            return '/api/locations';
                        default:
                            throw new Error('Invalid maser type');
                    }
                };
                MasterService.prototype.getAll = function (masterType) {
                    return this.http
                        .get(this.getBaseUrl(masterType), this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return r.json(); })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                return MasterService;
            }());
            MasterService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [router_1.Router,
                    http_1.Http,
                    authentication_service_1.AuthenticationService,
                    error_handler_service_1.ErrorHandlerService])
            ], MasterService);
            exports_1("MasterService", MasterService);
        }
    };
});
//# sourceMappingURL=master.service.js.map